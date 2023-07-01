import RegularPlayer from './RegularPlayer.js'
import LoggedPlayerTextures from './LoggedPlayerTextures.js'
import { PlayerProperty } from './Player.js'

/** 
 * Represents a logged in player.
 * - Has ability to manipulate their skin via the {@link textures} property.
 */
class LoggedPlayer extends RegularPlayer {
  readonly associated_account: any
  
  constructor(playerData: any, associated_account: any) {
    super(playerData, true)

    this.associated_account = associated_account

    const texturesProp = playerData.properties?.find((prop: PlayerProperty) => prop.name === "textures")
    if (texturesProp?.value)
      this.textures = new LoggedPlayerTextures(texturesProp.value, associated_account)
  }
}

export {
  LoggedPlayer,
  LoggedPlayer as default
} 