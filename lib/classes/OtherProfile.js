const GameProfile = require('./GameProfile')

/**  @class
 * @desc Represents a Mojang game profile other than Minecraft
 */
class OtherProfile extends GameProfile {
  constructor(data, associated_account) {
    super(data, associated_account)
    this.data = data // We don't really care about other profiles
  }
}

module.exports = OtherProfile
