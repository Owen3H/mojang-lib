import Player, { PlayerIdentity } from '../player/Player'

/*
*  @class @desc Represents the players in a server
*/
class ServerPlayers {
  #max: number
  #online: number
  #sample: Player[]

  constructor(data: ServerPlayerData) {
    this.#max = data.max
    this.#online = data.online
    this.#sample = data.sample?.map(pl => new Player(pl))
  }
}

export type ServerPlayerData = {
  max: number
  online: number
  sample: PlayerIdentity[]
}

export {
  ServerPlayers,
  ServerPlayers as default
}