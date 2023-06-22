import Player from './Player'

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

export {
  ServerPlayers,
  ServerPlayers as default
}