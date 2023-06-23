const Player = require('./Player')
const RegularPlayerTextures = require('./RegularPlayerTextures')
const UsernameHistory = require('./UsernameHistory')

/** @class
 *  @desc Represents a regular player's general info such as uuid, name, skin, ...
 */
class RegularPlayer extends Player {
  constructor(data, logged = false) {
    super(data)

    this.legacy = data.legacy || false
    this.demo = data.demo || false
    this.username_history = new UsernameHistory(data.name_history)

    if (logged) return

    const texturesProp = data.properties?.find(prop => prop.name === "textures")
    if (texturesProp?.value) {
      this.textures = new RegularPlayerTextures(texturesProp.value, this)
    }
  }
}

module.exports = RegularPlayer
