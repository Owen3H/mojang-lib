import { ProfileProperty } from "../account/MojangAccount"

/** @class
 *  @desc Represents a basic Mojang game profile
 */
class GameProfile {
  readonly account: any
  readonly created: Date

  readonly game: string
  readonly uuid: string | number
  readonly username: string
  readonly token: string

  constructor(data: ProfileProperty, associated_account: any) {
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
