
import Player, { PlayerIdentity } from './Player'
import RegularPlayerTextures from './RegularPlayerTextures'
//const UsernameHistory = require('../deprecated/UsernameHistory')

/** 
 * @class @desc Represents a regular player's name, uuid & skin info.
 * - Username history has been removed by Mojang.
 */
class RegularPlayer extends Player {
  readonly legacy: boolean
  readonly demo: boolean

  textures: RegularPlayerTextures

  constructor(data: PlayerIdentity, logged = false) {
    super(data)

    this.legacy = data.legacy || false
    this.demo = data.demo || false

    //this.username_history = new UsernameHistory(data.name_history)

    if (logged) return

    const texturesProp = data.properties?.find(prop => prop.name === "textures")
    if (texturesProp?.value) {
      this.textures = new RegularPlayerTextures(texturesProp.value, this)
    }
  }
}

export {
  RegularPlayer,
  RegularPlayer as default
}
