const MCAPI_PLAYERS = require('./../apis/Players')
const GameProfile = require('./GameProfile')
const LoggedPlayer = require('./LoggedPlayer')

/**  @class
 * @desc Represents a user's Minecraft profile
 */
class MinecraftProfile extends GameProfile {
  player = undefined

  constructor(data, associated_account) {
    super(data, associated_account)
    this.legacy = data.legacyProfile
    this.suspended = data.suspended
    this.premium = data.paid
    this.migrated = data.migrated
  }

  // loadPlayer = () => new Promise((resolve, reject) => 
  //   MCAPI_PLAYERS.get(this.username, "RAW_RESULTS").then(data => {
  //     this.player = new LoggedPlayer(data, this.account)
  //     resolve()
  //   }).catch(reject))

  loadPlayer = async () => {
    const data = await MCAPI_PLAYERS.get(this.username, "RAW_RESULTS")
    this.player = new LoggedPlayer(data, this.account)
  }
}

module.exports = MinecraftProfile
