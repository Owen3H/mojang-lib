import MCAPI_PLAYERS from '../../apis/Players.js'
import GameProfile from './GameProfile.js'
import LoggedPlayer from '../player/LoggedPlayer.js'

/** 
 * Represents a user's Minecraft profile
 */
class MinecraftProfile extends GameProfile {
  readonly legacy: boolean
  readonly suspended: boolean
  readonly premium: boolean
  readonly migrated: boolean

  player: any

  constructor(data: any, associated_account: any) {
    super(data, associated_account)

    this.legacy = data.legacyProfile
    this.suspended = data.suspended
    this.premium = data.paid
    this.migrated = data.migrated
  }

  loadPlayer = async () => {
    const data = await MCAPI_PLAYERS.get(this.username, true)
    Object.defineProperty(this, 'player', { 
      value: new LoggedPlayer(data, this.account),
      writable: false,
      configurable: false
    })
  }

  changeName = async () => {
    
  }
  
  isNameAvailable = async () => {

  }
}

export {
  MinecraftProfile,
  MinecraftProfile as default
}
