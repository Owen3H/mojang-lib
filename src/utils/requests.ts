import { request } from 'undici'
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

class Requests {

  /**
   * @static @method GET - HTTP GET method
   *
   * @param  {String} url The url to GET
   */
  static GET = (url: string, opts = {}) => request(url, opts)

  /**
   * @static @method POST - HTTP POST method
   *
   * @param  {String}  url   The url to POST
   * @param  {Object}  opts  Options of the request
   */
  static POST = (url: string, opts: any) => request(url, {
    method: "POST",
    body: JSON.stringify(opts.payload),
    headers: opts.headers || {}
  })

  /**
   * @static @method DELETE - HTTP DELETE method
   *
   * @param  {String}  url   The url to DELETE
   * @param  {Object}  opts  Options of the request
   */
  static DELETE = (url: string, opts: any) => request(url, { 
    method: "DELETE",
    headers: opts.headers || {}
  })

  /**
   * @static @method pingServer - Pings a Minecraft server
   *
   * @param  {String} address  The server IP address
   * @param  {Number} port     The server port number
   * @param  {Number} protocol The protocol to use for the ping
   * @param  {Number} timeout  Duration in ms before the connection times out
   */
  static pingServer = (pingParams: PingParams): Promise<ServerData> => {
    return new Promise((resolve, reject) => {
      const { address, port, protocol, timeout } = pingParams

      const totalReadingDataBuffer = new MinecraftPacket()
      const client = new Socket()
  
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
        totalReadingDataBuffer.buffer = Buffer.concat([totalReadingDataBuffer.buffer, data])
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