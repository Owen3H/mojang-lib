import ServerPlayers, { ServerPlayerData } from './ServerPlayers.js'
import { default as servers } from '../../apis/Servers'

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
   */
  readonly host: string

  /**
   * The port used by the server.
   * @defaultValue `25565`
   */
  readonly port: number

  #icon: string
  #version: string
  #protocol: number
  #players: ServerPlayers
  #motd: ServerMotd
  
  /**
   * The server icon in the form of a {@link Blob}.
   */
  get icon() { return this.#icon }

  get version() { return this.#version }

  get protocol() { return this.#protocol }

  get players() { return this.#players }

  get motd() { return this.#motd }

  constructor(data: ServerData, host = 'localhost', port = 25565) {
    if (!data) throw new Error("[Server Constructor] - Parameter `data` is " + data)

    this.host = host
    this.port = port

    this.#init(data)
  }

  #init(data: ServerData) {
    const { favicon, players, description, version } = data
    const { name, protocol } = version
    const motdText = description?.text

    this.#version = name
    this.#protocol = protocol
    this.#icon = favicon
    this.#players = new ServerPlayers(players)
    this.#motd = { 
      raw: motdText, 
      formatted: formatMOTD(motdText)
    }
  }

  refresh = async () => {
    const data = await servers.ping(this.host, this.port)
    this.#init(data)
  }
}

export type ServerMotd = {
  raw: string
  formatted: string
}

export type ServerData = {
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

export {
  Server,
  Server as default
}