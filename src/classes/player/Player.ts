/**  
* @class @desc Represents a player with its minimal info (uuid and username)
*/
class Player {
  readonly uuid: string
  readonly username: string
  readonly properties: PlayerProperty[]

  constructor(data: PlayerIdentity) {
    this.uuid = data.id
    this.username = data.name
  }
}

export type PlayerIdentity = {
  demo?: boolean
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