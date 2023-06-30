import ServerPlayers, { ServerPlayerData } from './ServerPlayers.js'

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
  readonly version: string
  readonly protocol: number

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

  /**
   * The server icon in the form of a URL.
   */
  readonly favicon: string

  readonly players: ServerPlayers
  readonly motd: { raw: string, formatted: string }

  constructor(data: ServerData, host = 'localhost', port = 25565) {
    if (!data) throw new Error("[Server Constructor] - Parameter `data` is " + data)

    const { favicon, players, description, version } = data
    const { name, protocol } = version

    this.host = host
    this.port = port

    this.version = name
    this.protocol = protocol

    this.favicon = favicon
    
    this.players = new ServerPlayers(players)

    const motdText = description?.text
    this.motd = { 
      raw: motdText, 
      formatted: formatMOTD(motdText)
    }
  }
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