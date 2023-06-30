import MCAPI_PLAYERS from '../../apis/Players.js'
import GameProfile from './GameProfile.js'
import LoggedPlayer from '../player/LoggedPlayer.js'

/** 
 * Represents a user's Minecraft profile
 */
class MinecraftProfile extends GameProfile {
  private _player: any
  get player() {
    return this._player
  }

  readonly legacy: boolean
  readonly suspended: boolean
  readonly premium: boolean
  readonly migrated: boolean

  constructor(data: any, associated_account: any) {
    super(data, associated_account)

    this.legacy = data.legacyProfile
    this.suspended = data.suspended
    this.premium = data.paid
    this.migrated = data.migrated
  }

  loadPlayer = async () => {
    const data = await MCAPI_PLAYERS.get(this.username, true)
    this._player = new LoggedPlayer(data, this.account)
  }
}

export {
  MinecraftProfile,
  MinecraftProfile as default
}
