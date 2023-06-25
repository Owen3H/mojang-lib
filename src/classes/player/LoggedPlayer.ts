import RegularPlayer from './RegularPlayer'
import LoggedPlayerTextures from './LoggedPlayerTextures'
import { PlayerProperty } from './Player'

/** 
 * @class @desc Represents a logged in player.
 * - Has ability to manipulate their skin
 */
class LoggedPlayer extends RegularPlayer {
  readonly associated_account: any
  
  constructor(data: any, associated_account: any) {
    super(data, true)

    this.associated_account = associated_account

    const texturesProp = data.properties?.find((prop: PlayerProperty) => prop.name === "textures")
    if (texturesProp?.value) {
      this.textures = new LoggedPlayerTextures(texturesProp.value, this, associated_account)
    }
  }
}

export {
  LoggedPlayer,
  LoggedPlayer as default
} 