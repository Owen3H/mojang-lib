const Player = require('./Player')

/*
*  @class
*  @desc Represents the players in a server
*/
class ServerPlayers {
  constructor(data) {
    this.max = data.max
    this.online = data.online
    this.sample = data.sample?.map(pl => new Player(pl))
  }
}

module.exports = ServerPlayers