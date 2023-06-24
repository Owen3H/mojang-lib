import GameProfile from '../profile/GameProfile'
import MinecraftProfile from '../profile/MinecraftProfile'
import OtherProfile from '../profile/OtherProfile'
import { MojangAccountData } from './MojangAccount'

/**  
 * @class @desc Represents a Mojang Account's game profiles
 */
class MojangAccountProfiles {
  readonly list: GameProfile[]
  readonly selected: GameProfile

  constructor(data: MojangAccountData, associated_account: any) {
    const profiles = data.availableProfiles ?? []
    
    for (const profile of profiles) {
      const gameProfile = profile.agent === "minecraft" 
        ? new MinecraftProfile(profile, associated_account) 
        : new OtherProfile(profile, associated_account)

      this.list.push(gameProfile)

      if (profile.id === data.selectedProfile.id) 
        this.selected = gameProfile
    }
  }
}

export {
  MojangAccountProfiles,
  MojangAccountProfiles as default
} 
