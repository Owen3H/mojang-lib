import { Requests as reqs } from '../utils/requests.js'
import Server, { OnlineServer, PingedServer } from '../classes/server/Server.js'
import { isNode } from '../utils/fn.js'

class MCAPI_SERVERS {
  /**
   * The list of blocked servers. 
   * Expressed as SHA1 encoded IP addresses.
   * 
   * @see
   * Refer to the '*Blocked Servers*' section of {@link https://wiki.vg/Mojang_API#Blocked_Servers | the wiki}.
   */
  static blockedServers = async () => {
    const serverList = await reqs.GET("https://sessionserver.mojang.com/blockedservers")
        .then(res => res.body.text()).catch(console.error)

    if (!serverList) return null
    return serverList.split("\n")
  }
    
  /**
   * Pings and retreives info on the requested server.
   *
   * @param host The server IP or hostname.
   * Supports attaching the port number, e.g. `play.example.net:3000`
   * 
   * @param port The server port number.
   * If not specified, the ":port" postfix in the `host` string is used. 
   * Otherwise, it will fallback to the default of `25565`.
   */
  static get = async (host: string, port?: number) => {
    const data = await this.ping(host, port)
    return new Server(data as OnlineServer, host, port)
  }

  /**
   * @internal
   */
  static ping = async (
    host: string, 
    port?: number
  ): Promise<PingedServer | OnlineServer> => {
    // Seperate address from the port.
    const arr = host.split(":")
    const address = arr[0]

    if (isNode()) {
      if (!port) port = arr.length > 1 ? parseInt(arr[1]) : 25565
    
      return await reqs.sendServerPing({ address, port }).catch((e: Error) => {
        console.error(e)
        return null
      })
    }
  
    // TCP pings can't be sent in the browser,
    // fallback to API where the response is the same.
    const url = `https://api.mcsrvstat.us/3/${address}`
    const res = await fetch(url).catch(console.error)

    return res ? await res.json() : null
  } 
}

export {
  MCAPI_SERVERS,
  MCAPI_SERVERS as default
}