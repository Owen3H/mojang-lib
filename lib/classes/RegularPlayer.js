const Player = require('./Player')
const RegularPlayerTextures = require('./RegularPlayerTextures')
const UsernameHistory = require('./UsernameHistory')

/**  @class
 * @desc Represents a regular player's general info such as uuid, name, skin, ...
 */
class RegularPlayer extends Player {
  constructor(data) {
    super(data)

    this.legacy = data.legacy || false
    this.demo = data.demo || false
    this.username_history = new UsernameHistory(data.name_history)

    const len = data.properties.length
    for (let i = 0; i < len; i++) {
      if (prop.name === "textures") {
        this.textures = new RegularPlayerTextures(prop.value, this)
      }
    }
  }
}

module.exports = RegularPlayer
