import MojangAccountProperties from './MojangAccountProperties'
import MojangAccountProfiles from './MojangAccountProfiles'

/**  
 * @class @desc Represents a Mojang Account
 */
class MojangAccount {
  readonly registration: AccountRegistration
  readonly _tokens: { access: string; client: string  }
  readonly account_id: string
  readonly username: string
  readonly email: string
  readonly properties: MojangAccountProperties
  readonly profiles: MojangAccountProfiles

  constructor(data: MojangAccountData) {
    // Used by MCAPI
    this._tokens = {
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

    //this.last_password_change = new Date(data.user.passwordChangedAt)
    //this.birthday = new Date(data.user.dateOfBirth)
    this.properties = new MojangAccountProperties(data)

    // Available profiles
    this.profiles = new MojangAccountProfiles(data, this)
  }
} 

export type UserProperty = {
  name: string
  value: string
}

export type ProfileProperty = AuthenticatedProfile & {
  legacyProfile?: boolean
  agent?: string
  createdAt: string | number
  tokenId?: string
  suspended: boolean
  migrated: boolean
}

export type AuthenticatedProfile = {
  name: string
  id: string
  legacy?: boolean
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
