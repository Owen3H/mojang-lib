import { Requests as reqs } from '../utils/requests'
import Server from '../classes/server/Server'

class MCAPI_SERVERS {
  /**
   * @static @attribute DEFAULT_PORT - The default port for Minecraft servers
   */
  static readonly DEFAULT_PORT = 25565

  /**
   * @static @method blockedServers - Get the list of SHA1 encoded blocked servers IPs
   */
  static blockedServers = async () => {
    const serverList = await reqs.GET("https://sessionserver.mojang.com/blockedservers")
        .then(res => res.body.text()).catch(console.error)

    if (!serverList) return null
    return serverList.split("\n")
  }
    
  /**
   * @static @method get - Retrieve server information.
   *
   * @param { String } host   - The IP address of the server. Allows ":port" postfix.
   * @param { Number } [port] - The port to use, defaults to `25565` if not passed.
   */
  static get = async (host: string, port?: number) => {
    // Handling play.host.com:port
    let arr = host.split(":")
    const address = arr[0]

    port = arr.length > 1 ? parseInt(arr[1]) : this.DEFAULT_PORT

    try {
      const data = await reqs.pingServer({ address, port })
      return new Server(data, address, port)
    }
    catch (e) {
      console.error(e)
      return null
    }
  }
}

export {
  MCAPI_SERVERS,
  MCAPI_SERVERS as default
}