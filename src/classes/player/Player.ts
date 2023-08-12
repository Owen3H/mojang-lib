/**  
* @public
* The base class that other Player related classes extend.
* Represents a player and their basic info. (username, uuid, etc.)
*/
class Player {
  readonly uuid: string
  readonly username: string
  readonly properties: PlayerProperty[]

  constructor(data: PlayerIdentity) {
    this.uuid = data.id
    this.username = data.name
    this.properties = data.properties
  }
}

export type PlayerIdentity = {
  uuid?: string
  id?: string
  name: string
  properties?: PlayerProperty[]
  demo?: boolean
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