import { ProfileProperty } from '../account/MojangAccount'
import GameProfile from './GameProfile'

/**  
 * @class @desc Represents a Mojang game profile other than Minecraft
 */
class OtherProfile extends GameProfile {
  readonly data: any

  constructor(data: ProfileProperty, associated_account: any) {
    super(data, associated_account)
    this.data = data // We don't really care about other profiles
  }
}

export {
  OtherProfile,
  OtherProfile as default
}