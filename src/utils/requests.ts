import net from 'net'

import MCAPIError from './MCAPIError.js'
import MinecraftPacket from '../classes/misc/MinecraftPacket.js'
import { OnlineServer, PingedServer } from '../classes/server/Server.js'

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

type HttpMethod = "GET" | "POST" |  "DELETE"

class Requests {
  private static send = async (url: string, opts: ReqOptions, method?: HttpMethod) => {
    const options: any = null

    if (method) options.method = method
    if (opts?.payload) options.body = opts.payload
    if (opts?.headers) options.headers = opts.headers || {
      Authorization: `Bearer ${opts}`
    }

    const isBrowser = typeof window === "object"
    if (isBrowser) url = `https://corsproxy.io/?${encodeURIComponent(url)}`

    return await fetch(url, options)
  }

  /**
   * Sends an HTTP `GET` request to the input URL.
   *
   * @internal
   * @param url The URL to send the request to.
   * @param opts The options that will be used in the request. (Optional)
   */
  static GET = (url: string, opts?: ReqOptions) => this.send(url, opts)

  /**
   * Sends an HTTP `POST` request to the input URL.
   *
   * @internal
   * @param url The URL to send the request to.
   * @param opts The options that will be used in the request. (Optional)
   */
  static POST = (url: string, opts?: ReqOptions) => this.send(url, opts, "POST")

  /**
   * Sends an HTTP `DELETE` request to the input URL.
   *
   * @internal
   * @param url The URL to send the request to.
   * @param opts The options that will be used in the request. (Optional)
   */
  static DELETE = (url: string, opts?: ReqOptions) => this.send(url, opts, "DELETE")

  static SOCKET_TIMEOUT = 300000

  /**
   * Pings a Minecraft server asynchronously and returns a raw object with server data.
   * Should not be called when running outside of a Node process.
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
  static sendServerPing(pingParams: PingParams): Promise<OnlineServer | PingedServer> {
    return new Promise((resolve, reject) => {
      const { address, port, protocol, timeout } = pingParams
      const totalReadingDataBuffer = new MinecraftPacket()

      const connectOpts = { host: address, port, timeout: timeout || this.SOCKET_TIMEOUT }

      // 'connect' listener
      const client = net.connect(connectOpts, () => { 
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
      
      client.on('data', buf => {
        // TODO: Eh, should `_buffer` be exposed like this?
        totalReadingDataBuffer.appendData(buf)
        client.end()
      })

      client.on('close', () => {
        totalReadingDataBuffer.readVarInt()
        const res = totalReadingDataBuffer.readString()
        const data = JSON.parse(res)

        resolve(data)
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