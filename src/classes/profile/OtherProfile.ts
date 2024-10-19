import GameProfile, { type ProfileProperty } from './GameProfile.js'
import { type MojangAccount } from "../account/MojangAccount.js"

/**  
 * Represents a Mojang game profile other than Minecraft
 */
class OtherProfile extends GameProfile {
  [name: string]: unknown

  // TODO: Give the params proper types.
  constructor(data: ProfileProperty, associated_account: MojangAccount) {
    super(data, associated_account)
    Object.assign(this, data)
  }
}

export {
  OtherProfile,
  OtherProfile as default
}
