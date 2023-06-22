const mcdata = require('minecraft-data')
const ServerPlayers = require('./ServerPlayers')

Array.prototype.last = function() {
  return this[this.length-1]
}

const protocolToVersion = protocol => {
  const versions = mcdata.postNettyVersionsByProtocolVersion.pc[protocol]

  if (!versions.length) return null
  return versions?.last().minecraftVersion
}

const remove_start_end_spaces = str => str.replace(/^ {1,}| {1,}$/g, "")

const formatMOTD = (motd) => {
  if (!motd) return
  var lines = motd.split(/\n|\r/g)
  for (var i = 0; i < lines.length; i++) {
    lines[i] = remove_start_end_spaces(lines[i])
  }
  return lines.join("\n")
}

/**  @class
 * @desc Represents a pinged server with its general info
 */
module.exports = class Server {
  constructor(data, host, port) {
    const { name, protocol, players, description } = data.version
    const motdText = description.text

    this.host = host
    this.port = port

    this.version = name
    this.protocol = protocol

    this.version_from_protocol = protocolToVersion(this.protocol) || name
    this.favicon = data.favicon

    this.motd = { raw: motdText, formatted: formatMOTD(motdText) }
    this.players = new ServerPlayers(data.players)
  }
}
