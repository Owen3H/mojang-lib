import { Requests as reqs } from '../utils/requests'
import Server from '../classes/server/Server'

class MCAPI_SERVERS {
  /**
   * @static @attribute DEFAULT_PORT - The default port for Minecraft servers
   */
  static readonly DEFAULT_PORT = 25565

  /**
   * @static @method blockedServers - Get the list of SHA1 encoded blocked servers ips
   */
  static blockedServers = () => new Promise((resolve, reject) =>
      reqs.GET("https://sessionserver.mojang.com/blockedservers")
        .then((data: any) => resolve(data.split("\n"))).catch(reject))
    
  /**
   * @static @method get - Get a server's information
   *
   * @param {String} host - The ip adress of the server optionnaly following with ":port"
   * @param {Number} [port] - The port the server. If not asigned, the default Minecraft port will be used
   *
   */
  static get = (host: any, port: number) => new Promise((resolve, reject) => {
    // Handling play.host.com:port
    let address = host.split(":")

    port = address.length > 1 ? host[1] : this.DEFAULT_PORT
    address = host[0]

    reqs.pingServer({ address, port: Number(port) }).then(data =>
      resolve(new Server(data, address, port))).catch(reject)
  })
}

export {
  MCAPI_SERVERS,
  MCAPI_SERVERS as default
}