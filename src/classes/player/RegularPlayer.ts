
import Player, { PlayerIdentity } from './Player.js'
import RegularPlayerTextures from './RegularPlayerTextures.js'

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

    if (!logged) {
      const texturesProp = data.properties?.find(prop => prop.name === "textures")

      if (texturesProp?.value) 
        this.textures = new RegularPlayerTextures(texturesProp.value)
    }
  }
}

export {
  RegularPlayer,
  RegularPlayer as default
}
