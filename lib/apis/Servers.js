const reqs = require('../utils/requests')
const Server = require('./../classes/Server')

module.exports = class MCAPI_SERVERS {
  /**
   * @static @attribute DEFAULT_PORT - The default port for Minecraft servers
   */
  static get DEFAULT_PORT() {
    return 25565
  }

  /**
   * @static @method blockedServers - Get the list of SHA1 encoded blocked servers ips
   */
  static blockedServers = () => new Promise((resolve, reject) =>
      reqs.GET("https://sessionserver.mojang.com/blockedservers")
        .then(data => resolve(data.split("\n"))).catch(reject))
    
  /**
   * @static @method get - Get a server's information
   *
   * @param {String} host - The ip adress of the server optionnaly following with ":port"
   * @param {Number} [port] - The port the server. If not asigned, the default Minecraft port will be used
   *
   * Inspired from Cryptkeeper and wizardfrag's mc-ping
   * @see {@link https://github.com/Cryptkeeper/mc-ping-updated|mc-ping-updated repository on Github}
   *
   * Also used the wiki.vg documentation about Handshaking
   * @see {@link https://wiki.vg/Protocol|Minecraft communication protocol}
   * @see {@link https://wiki.vg/Server_List_Ping|Server List Ping}
   */
  static get = (host, port) => new Promise((resolve, reject) => {
    // Handling play.host.com:port
    host = host.split(":")
    port = host.length > 1 ? host[1] : this.DEFAULT_PORT

    host = host[0]

    reqs.pingServer(host, port).then(data =>
      resolve(new Server(data, host, port))).catch(reject)
  })
}
