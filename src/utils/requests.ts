//@ts-ignore
import { request, Dispatcher } from 'undici-shim'
import { Socket } from 'net'

import MCAPIError from './MCAPIError.js'
import MinecraftPacket from '../classes/misc/MinecraftPacket.js'
import { ServerData } from '../classes/server/Server.js'

type PingParams = {
  address: string
  port?: number
  protocol?: number
  timeout?: number
}

type ReqOptions = {
  method?: string
  payload?: {}
  headers?: {}
}

class Requests {
  private static send = async (url: string, opts: ReqOptions, method?: Dispatcher.HttpMethod) => {
    const options: any = null

    if (method) options.method = method
    if (opts?.payload) options.body = opts.payload
    if (opts?.headers) options.headers = opts.headers || {
      Authorization: `Bearer ${opts}`
    }

    const isBrowser = typeof window === "object"
    if (isBrowser) url = `https://corsproxy.io/?${encodeURIComponent(url)}`

    return await request(url, options)
  }

  /**
   * Sends an HTTP `GET` request to the inputted URL.
   *
   * @internal
   * @param url The URL to send the request to.
   * @param opts The options that will be used in the request. (Optional)
   */
  static GET = (url: string, opts?: ReqOptions) => this.send(url, opts)

  /**
   * Sends an HTTP `POST` request to the inputted URL.
   *
   * @internal
   * @param url The URL to send the request to.
   * @param opts The options that will be used in the request. (Optional)
   */
  static POST = (url: string, opts?: ReqOptions) => this.send(url, opts, "POST")

  /**
   * Sends an HTTP `DELETE` request to the inputted URL.
   *
   * @internal
   * @param url The URL to send the request to.
   * @param opts The options that will be used in the request. (Optional)
   */
  static DELETE = (url: string, opts?: ReqOptions) => this.send(url, opts, "DELETE")

  /**
   * Pings a Minecraft server asynchronously and returns a raw object with server data.
   * 
   * Used internally to create a new Server instance.
   * ```
   * const server = new Server(data, host, port)
   * console.log(server.players)
   * ```
   *
   * @internal
   * @param address  The server IP address
   * @param port     The server port number
   * @param protocol The protocol to use for the ping
   * @param timeout  Duration in ms before the connection times out
   */
  static sendServerPing = (pingParams: PingParams): Promise<ServerData> => {
    return new Promise((resolve, reject) => {
      const { address, port, protocol, timeout } = pingParams,
            totalReadingDataBuffer = new MinecraftPacket(),
            client = new Socket()
            
      // Only set timeout in node. (can't find a polyfill)
      if (typeof window !== 'object') 
        client.setTimeout(timeout ?? 30000)

      client.connect(port, address)
  
      client.on("connect", () => {
        const handshake = new MinecraftPacket()
        handshake.writeVarInt(0)
        handshake.writeVarInt(protocol)
        handshake.writeString(address)
        handshake.writeUShort(port)
        handshake.writeVarInt(1)
        handshake.send(client)
  
        const legacyPing = new MinecraftPacket()
        legacyPing.writeVarInt(0)
        legacyPing.send(client)
      })
  
      client.on('data', (data) => {
        totalReadingDataBuffer._buffer = Buffer.concat([totalReadingDataBuffer.buffer, data])
        client.end()
      })
  
      client.on('close', () => {
        totalReadingDataBuffer.readVarInt()
        const response_data = totalReadingDataBuffer.readString()
        resolve(JSON.parse(response_data))
      })
  
      client.on('timeout', () => {
        client.destroy()
        reject(new MCAPIError(408, "Timed out"))
      })
  
      client.on('error', (e: Error) => {
        client.destroy()
        reject(e)
      })
    })
  }
}

export {
  Requests,
  Requests as default
}