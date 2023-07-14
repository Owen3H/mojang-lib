import { ProfileProperty } from './GameProfile.js'
import GameProfile from './GameProfile.js'

/**  
 * Represents a Mojang game profile other than Minecraft
 */
class OtherProfile extends GameProfile {
  [name: string]: unknown

  constructor(data: ProfileProperty, associated_account: any) {
    super(data, associated_account)
    Object.assign(this, data)
  }
}

export {
  OtherProfile,
  OtherProfile as default
}
