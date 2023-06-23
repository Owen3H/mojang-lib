const MinecraftProfile = require('../profile/MinecraftProfile')
const OtherProfile = require('../profile/OtherProfile')

/**  @class
 * @desc Represents a Mojang Account's game profiles
 */
class MojangAccountProfiles {
  list = []

  constructor(data, associated_account) {
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

module.exports = MojangAccountProfiles
