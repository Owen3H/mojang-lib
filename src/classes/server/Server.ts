import ServerPlayers, { ServerPlayerData } from './ServerPlayers'
//import { postNettyVersionsByProtocolVersion } from 'minecraft-data'

// //@ts-ignore
// Array.prototype.last = function() {
//   return this[this.length-1]
// }

// const protocolToVersion = (protocol: number) => {
//   const versions = postNettyVersionsByProtocolVersion.pc[protocol]
  
//   //@ts-ignore
//   if (!versions?.length) return null //@ts-ignore
//   return versions.last().minecraftVersion
// }

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
 * @class @desc Represents a pinged server with its general info
 */
class Server {
  readonly version: string
  readonly protocol: number
  readonly host: string
  readonly port: number
  readonly favicon: string
  readonly players: ServerPlayers
  readonly motd: { raw: string, formatted: string }

  constructor(data: ServerData, host: string, port: number) {
    if (!data) throw new Error("Error getting server, data is null!")

    const { favicon, players, description, version } = data
    const { name, protocol } = version
    const motdText = description.text

    this.version = name
    this.protocol = protocol

    this.host = host || 'localhost'
    this.port = port || 25565
    this.favicon = favicon
    this.players = new ServerPlayers(players)

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