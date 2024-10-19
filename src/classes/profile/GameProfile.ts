import { type MojangAccount } from "../account/MojangAccount.js"

export interface AuthenticatedProfile {
  name: string
  id: string
  legacy?: boolean
}

export interface ProfileProperty extends AuthenticatedProfile {
  legacyProfile?: boolean
  agent?: string
  createdAt: string | number
  tokenId?: string
  suspended: boolean
  migrated: boolean
}

/** 
 * Represents a basic Mojang game profile
 */
class GameProfile {
  readonly account: MojangAccount
  readonly created: Date
  readonly game: string
  readonly uuid: string | number
  readonly username: string
  readonly token: string

  constructor(data: ProfileProperty, associated_account: MojangAccount) {
    const { createdAt, agent, id, name, tokenId } = data

    this.account = associated_account
    this.created = new Date(createdAt)
    this.game = agent
    this.uuid = id
    this.username = name
    this.token = tokenId
  }
}

export {
  GameProfile,
  GameProfile as default
}
