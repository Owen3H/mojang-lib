import { postNettyVersionsByProtocolVersion } from 'minecraft-data'
import ServerPlayers from './ServerPlayers'

Array.prototype.last = function() {
  return this[this.length-1]
}

const protocolToVersion = protocol => {
  const versions = postNettyVersionsByProtocolVersion.pc[protocol]

  if (!versions.length) return null
  return versions?.last().minecraftVersion
}

const remove_start_end_spaces = str => str.replace(/^ {1,}| {1,}$/g, "")

const formatMOTD = motd => {
  if (!motd) return

  const lines = motd.split(/\n|\r/g)
  return lines.map(line => {
    line = remove_start_end_spaces(line)
    return line
  }).join("\n")
}

/** @class
 *  @desc Represents a pinged server with its general info
 */
class Server {
  constructor(data, host, port) {
    const { name, protocol } = data.version
    const motdText = data.description.text

    this.host = host
    this.port = port
    this.version = name
    this.motd = { 
      raw: motdText, 
      formatted: formatMOTD(motdText) 
    }
    this.players = new ServerPlayers(data.players)
    this.protocol = protocol
    this.version_from_protocol = protocolToVersion(this.protocol) || name
    this.favicon = data.favicon
  }
}

export {
  Server,
  Server as default
}