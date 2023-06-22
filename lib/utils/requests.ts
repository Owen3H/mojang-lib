import { request } from 'undici'
import { Socket } from 'net'

import MCAPIError from './MCAPIError'
import MinecraftPacket from '../classes/MinecraftPacket'

type PingParams = {
  address: string
  port: number
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
  static pingServer = async (pingParams: PingParams) => {
    const { address, port, protocol, timeout } = pingParams

    // The data in sent by little packets so we need a global buffer to store the sub buffers
    const totalReadingDataBuffer = new MinecraftPacket(),
          client = new Socket()

    // Setting the max delay to wait for the server response
    client.setTimeout(timeout)
    client.connect(port, address)

    // Triggered once the connection is established -> sending handshake
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

    // New data received, add to the buffer.
    client.on('data', (data) => {
      totalReadingDataBuffer.buffer = Buffer.concat([totalReadingDataBuffer.buffer, data])
      client.end()
    })

    // Triggered when the connection shut down (error occurred or server finished sending data)
    client.on('close', () => {
      totalReadingDataBuffer.readVarInt()
      const response_data = totalReadingDataBuffer.readString()

      return JSON.parse(response_data)
    })

    // Triggered when the connection times out (default 30s)
    client.on('timeout', () => {
      client.destroy()
      return new MCAPIError(408, "Timed out")
    })

    // Triggered when the connection fails
    client.on('error', (err: Error) => {
      client.destroy()
      return err
    })
  }
}

export {
  Requests,
  Requests as default
}