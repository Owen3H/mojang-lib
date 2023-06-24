import MCAPI_PLAYERS from '../../apis/Players'
import GameProfile from './GameProfile'
import LoggedPlayer from '../player/LoggedPlayer'

/** @class
 *  @desc Represents a user's Minecraft profile
 */
class MinecraftProfile extends GameProfile {
  #player: any

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

  get getPlayer() { return this.#player }

  loadPlayer = async () => {
    const data = await MCAPI_PLAYERS.get(this.username, "RAW_RESULTS")
    this.#player = new LoggedPlayer(data, this.account)
  }
}

export {
  MinecraftProfile,
  MinecraftProfile as default
}
