/** @class
 *  @desc Represents a basic Mojang game profile
 */
class GameProfile {
  account: any
  created: Date

  game: string
  uuid: string | number
  username: string
  token: string

  constructor(data: any, associated_account: any) {
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
