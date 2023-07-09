import MojangAccountProperties from './MojangAccountProperties.js'
import MojangAccountProfiles from './MojangAccountProfiles.js'
import { ProfileProperty } from '../profile/GameProfile.js'

/**  
 * Represents a Mojang Account
 */
class MojangAccount {
  /**
   * @internal
   */
  readonly tokens: { access: string; client: string  }

  readonly registration: AccountRegistration
  readonly account_id: string
  readonly username: string
  readonly email: string
  readonly properties: MojangAccountProperties
  readonly profiles: MojangAccountProfiles

  constructor(data: MojangAccountData) {
    // Used by MCAPI
    this.tokens = {
      access: data.accessToken,
      client: data.clientToken
    }

    // Account info
    this.account_id = data.user.id
    this.email = data.user.email
    this.username = data.user.username
    
    this.registration = {
      ip: data.user.registerIp,
      date: new Date(data.user.registeredAt)
    }

    this.properties = new MojangAccountProperties(data)
    this.profiles = new MojangAccountProfiles(data, this)
  }
} 

export type UserProperty = {
  name: string
  value: string
}

export type AccountRegistration = {
  ip: string
  date: Date
}

export type MojangAccountData = {
  clientToken: string
  accessToken: string
  user: {
    username: string
    properties: UserProperty[]
    id: string
    email?: string
    registerIp?: string
    registeredAt?: string | number
  }
  availableProfiles: ProfileProperty[]
  selectedProfile: ProfileProperty
}

export {
  MojangAccount,
  MojangAccount as default
}
