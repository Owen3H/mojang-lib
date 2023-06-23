import MojangAccountProperties from './MojangAccountProperties'
import MojangAccountProfiles from './MojangAccountProfiles'

/**  
 * @class @desc Represents a Mojang Account
 */
class MojangAccount {
  constructor(data) {
    // Used by MCAPI
    this._tokens = {
      access: data.accessToken,
      client: data.clientToken
    }

    // Acount info
    this.account_id = data.user.id
    this.email = data.user.email
    this.username = data.user.username
    this.registration = {
      ip: data.user.registerIp,
      date: new Date(data.user.registeredAt)
    }

    this.last_password_change = new Date(data.user.passwordChangedAt)
    this.birthday = new Date(data.user.dateOfBirth)
    this.properties = new MojangAccountProperties(data)

    // Available profiles
    this.profiles = new MojangAccountProfiles(data, this)
  }
}

export {
  MojangAccount,
  MojangAccount as default
}
