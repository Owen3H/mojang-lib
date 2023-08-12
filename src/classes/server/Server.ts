import ServerPlayers from './ServerPlayers.js'
import { default as servers } from '../../apis/Servers.js'
import { PlayerIdentity } from '../player/Player.js'

const remove_start_end_spaces = (str: string) => str.replace(/^ {1,}| {1,}$/g, "")

const formatMOTD = (motd: string) => {
  if (!motd) return ''

  const lines = motd.split(/\n|\r/g)
  return lines.map(line => {
    line = remove_start_end_spaces(line)
    return line
  }).join("\n")
}

/**
 * @public
 * 
 * Represents a pinged server. 
 * An instance of this class is returned after calling {@link Servers}
 * - The `data` parameter must adhere to the {@link ServerData} type otherwise some properties may be undefined.
 * - If unspecified, the `host` parameter will default to `localhost`.
 * - If unspecified, the `port` parameter will default to `25565`.
 */
class Server {
  /**
   * The hostname of the server, e.g. `play.example.net:3000`.
   * @defaultValue `localhost`
   * @readonly
   */
  host: string

  /**
   * The port used by the server.
   * @defaultValue `25565`
   * @readonly
   */
  port: number

  /**
   * The server icon in the form of a {@link Blob}.
   * @readonly
   */
  icon: string

  /**
   * The version (or range) this server supports.
   * @readonly
   */
  version: string

  /**
   * The protocol version number of this server, used to check for incompatibilites
   * between the player's client and the server they are trying to connect to.
   * 
   * @see {@link https://wiki.vg/Protocol_version_numbers List of protocol/version mappings.}
   * @readonly
   */
  protocol: number

  /**
   * The instance of {@link ServerPlayers}
   * @readonly
   */
  players: ServerPlayers

  /**
   * The 'Message of the Day' configured by this server, a.k.a the description
   * shown below the server name when connecting via the server list.
   * @readonly
   */
  motd: ServerMotd
  
  constructor(data: OnlineServer, host = 'localhost', port = 25565) {
    if (!data) throw new Error(`[Server Constructor] - Parameter 'data' is ${data}`)

    this.#defineProp('host', host)
    this.#defineProp('port', port)

    this.#init(data)
  }

  #defineProp = (k: string, v: any) => Object.defineProperty(this, k, { 
    value: v, 
    writable: false, 
    configurable: false
  })

  #init(data: OnlineServer) {
    const { 
      online, icon, players,
      motd, version, protocol
    } = data

    const title = motd.raw[0]
    const motdText = motd.raw[1]

    this.#defineProp('online', online)
    this.#defineProp('version', version)
    this.#defineProp('protocol', protocol)
    this.#defineProp('icon', icon)
    this.#defineProp('players', new ServerPlayers(players))

    this.#defineProp('title', title)
    this.#defineProp('motd', { 
      raw: motdText || "",
      formatted: formatMOTD(motdText)
    })
  }

  refresh = async () => {
    const data = await servers.ping(this.host, this.port)
    this.#init(data as OnlineServer)
  }
}

export type ServerMotd = {
  raw: string
  formatted: string
}

export type TcpPingedServer = {
  version: {
    name: string
    protocol: number
  }
  protocol: string
  favicon: string
  players: ServerPlayerData
  description: {
    text: string
  }
  enforcesSecureChat: boolean
  previewsChat: boolean
}

export type NamesRaw = {
  names: string[]
  raw: string[]
}

type NameVersion = {
  name: string
  version: string
}

export type RawCleanHtml = {
  raw: string[]
  clean: string[]
  html: string[]
}

export type PingedServer = {
  online: boolean
  ip: string
  port: number
  hostname?: string
  debug: {
    ping: boolean
    query: boolean
    srv: boolean
    queryMismatch: boolean
    ipInSrv: boolean
    cnameInSrv: boolean
    animatedMotd: boolean
    cacheHit: boolean
    cacheTime: number
    cacheExpire: number
    apiVersion: number
  }
}

export type OnlineServer = PingedServer & ServerOptionals & {
  version: string
  protocol: number | NameVersion[]
  icon?: string
  map: string
  gamemode?: string
  serverId?: string
  eulaBlocked?: boolean
  motd: RawCleanHtml
  players: ServerPlayerData
}

type ServerOptionals = Partial<{
  software: string
  plugins: NamesRaw | NameVersion[]
  mods: NamesRaw | NameVersion[]
  info: RawCleanHtml
}>

export type ServerPlayerData = {
  online: number
  max: number
  list?: PlayerIdentity[]
  uuid?: {
    [key: string]: string
  }
}

export {
  Server,
  Server as default
}