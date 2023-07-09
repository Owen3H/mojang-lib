import GameProfile from '../profile/GameProfile.js'
import MinecraftProfile from '../profile/MinecraftProfile.js'
import OtherProfile from '../profile/OtherProfile.js'
import { MojangAccountData } from './MojangAccount.js'

/**  
 * Represents a Mojang Account's game profiles
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
