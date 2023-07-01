
import Player, { PlayerIdentity } from './Player.js'
import RegularPlayerTextures from './RegularPlayerTextures.js'

/** 
 * Extends {@link Player} with added skin and cape info.
 * - Username history has been removed by Mojang.
 */
class RegularPlayer extends Player {
  readonly legacy: boolean
  readonly demo: boolean

  protected textures: RegularPlayerTextures

  constructor(playerData: PlayerIdentity, logged = false) {
    super(playerData)

    const { legacy, demo, properties } = playerData

    this.legacy = legacy || false
    this.demo = demo || false

    if (!logged) {
      const texturesProp = properties?.find(prop => prop.name === "textures")

      if (texturesProp?.value) 
        this.textures = new RegularPlayerTextures(texturesProp.value)
    }
  }
}

export {
  RegularPlayer,
  RegularPlayer as default
}
