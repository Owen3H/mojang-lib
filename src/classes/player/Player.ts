/*
*  @class @desc Represents a player with its minimal info (uuid and username)
*/
class Player {
  constructor(data: any) {
    Object.assign(this, data)
  }
}

export type PlayerIdentity = {
  demo: boolean
  name: string
  id: string
  properties: PlayerProperty[]
  legacy?: boolean
}

export type PlayerProperty = {
  name: string
  value: string
}

export {
  Player,
  Player as default
}