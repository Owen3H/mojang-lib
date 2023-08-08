import Player from '../player/Player.js'
import { ServerPlayerData } from './Server.js'

class ServerPlayers {
  readonly max: number
  readonly online: number
  readonly list: Player[]

  constructor(data: ServerPlayerData) {
    this.max = data.max
    this.online = data.online
    this.list = data.list?.map(pl => new Player(pl))
  }
}

export {
  ServerPlayers,
  ServerPlayers as default
}