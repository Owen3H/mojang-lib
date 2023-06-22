/**  @class
 * @desc Represents the basic Mojang game profile information
 */
class GameProfile {
  constructor(data, associated_account) {
    const { createdAt, agent, id, name, tokenId } = data

    this.account = associated_account
    this.created = new Date(createdAt)

    this.game = agent
    this.uuid = id
    this.username = name
    this.token = tokenId
  }
}

module.exports = GameProfile
