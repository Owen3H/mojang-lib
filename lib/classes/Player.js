/*
*  @class
*  @desc Represents a player with its minimal info (uuid and username)
*/
class Player {
  constructor(data) {
    this.uuid = data.id
    this.username = data.name
  }
}

export {
  Player,
  Player as default
}