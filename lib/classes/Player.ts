/*
*  @class
*  @desc Represents a player with its minimal info (uuid and username)
*/
class Player {
  constructor(data: PlayerIdentity) {
    Object.assign(this, data)
  }
}

export type PlayerIdentity = {
  name: string
  id: string
  properties: PlayerProperty[]
}

export type PlayerProperty = {
  name: string
  value: string
}

export {
  Player,
  Player as default
}