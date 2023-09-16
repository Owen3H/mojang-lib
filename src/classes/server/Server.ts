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
  #host: string

  get host() { return this.#host }

  /**
   * The port used by the server.
   * @defaultValue `25565`
   * @readonly
   */
  #port: number

  get port() { return this.#port }

  /**
   * The server icon in the form of a {@link Blob}.
   * @readonly
   */
  #icon: string

  get icon() { return this.#icon }

  /**
   * The version (or range) this server supports.
   * @readonly
   */
  #version: string
  
  get version() { return this.#version }

  /**
   * The protocol version number of this server, used to check for incompatibilites
   * between the player's client and the server they are trying to connect to.
   * 
   * @see {@link https://wiki.vg/Protocol_version_numbers List of protocol/version mappings.}
   * @readonly
   */
  #protocol: number | NameVersion[]

  get protocol() { return this.#protocol }

  /**
   * The instance of {@link ServerPlayers}
   * @readonly
   */
  #players: ServerPlayers

  get players() { return this.#players }

  /**
   * The title configured by this server, as shown above the MOTD.
   * @readonly
   */
  #title: string

  get title() { return this.#title }

  /**
   * The 'Message of the Day' configured by this server, a.k.a the description
   * shown below the title when connecting via the server list.
   * @readonly
   */
  #motd: ServerMotd

  get motd() { return this.#motd }

  /**
   * Denotes whether this server is up and not offline.
   * @readonly
   */
  #online: boolean

  get online() { return this.#online }
  
  constructor(data: OnlineServer, host = 'localhost', port = 25565) {
    if (!data) throw new Error(`[Server Constructor] - Parameter 'data' is ${data}`)

    this.#host = host
    this.#port = port

    this.#init(data)
  }

  #init(data: OnlineServer) {
    const { 
      online, icon, players,
      motd, version, protocol
    } = data

    this.#online = online
    this.#version = version
    this.#protocol = protocol
    this.#icon = icon
    this.#players = new ServerPlayers(players)

    if (motd) {
      const title = motd.raw[0]
      const motdText = motd.raw[1]

      this.#title = title
      this.#motd = {
        raw: motdText || "",
        formatted: formatMOTD(motdText)
      }
    }
  }

  refresh = async () => {
    const data = await servers.ping(this.#host, this.#port)
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