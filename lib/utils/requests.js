const { request } = require('undici')
const { Socket } = require('net')
const MCAPIError = require('./MCAPIError')
const MinecraftPacket = require('../classes/MinecraftPacket')

const resolveOrReject = (err, res, body, url, resolve, reject) => {
  const code = res.statusCode
  if (err) return reject(err)

  if (code >= 400 || code === 204) 
    return reject(new MCAPIError(code, `(${url}) Error ${code}.`))

  if ((code >= 200 && code < 400) || code !== 204) 
    return resolve(body)
}

class Requests {

  /**
   * @static @method GET - HTTP GET method
   *
   * @param  {String} url The url to GET
   */
  static GET = (url, opts = {}) => new Promise((resolve, reject) =>
    request(url, opts, (err, res, body) => resolveOrReject(err, res, body, url, resolve, reject)))

  /**
   * @static @method POST - HTTP POST method
   *
   * @param  {String}  url   The url to POST
   * @param  {Object}  opts  Options of the request
   */
  static POST = (url, opts) => new Promise((resolve, reject) => request(url, {
    method: "POST",
    body: JSON.stringify(opts.payload),
    headers: opts.headers || {}
  }, (err, res, body) => resolveOrReject(err, res, body, url, resolve, reject)))

  /**
   * @static @method DELETE - HTTP DELETE method
   *
   * @param  {String}  url   The url to DELETE
   * @param  {Object}  opts  Options of the request
   */
  static DELETE = (url, opts) => new Promise((resolve, reject) => request(url, { 
    method: "DELETE",
    headers: opts.headers || {}
  }, (err, res, body) => resolveOrReject(err, res, body, url, resolve, reject)))

  /**
   * @static @method pingServer - Pings a Minecraft server
   *
   * @param  {String} address  The server IP address
   * @param  {Number} port     The server port number
   * @param  {Number} protocol The protocol to use for the ping
   * @param  {Number} timeout  Duration in ms before the connection times out
   */
  static pingServer = (address, port, protocol, timeout = 30000) => new Promise((resolve, reject) => {
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
        try {
          totalReadingDataBuffer.readVarInt()
          const response_data = totalReadingDataBuffer.readString()

          return resolve(JSON.parse(response_data))
        } catch (e) { reject(e) }
      })

      // Triggered when the connection times out (default 30s)
      client.on('timeout', () => {
        client.destroy()
        return reject(new MCAPIError(408, "Timed out"))
      })

      // Triggered when the connection fails
      client.on('error', (err) => {
        client.destroy()
        return reject(err)
      })
  })
}

module.exports = Requests