/**  @class
 * @desc Represents a Mojang account's general properties
 */
class MojangAccountProperties {
  constructor(data) {
    const { user } = data

    this.suspended = user.suspended
    this.blocked = user.blocked
    this.secured = user.secured
    this.migrated = user.migrated
    this.email_verified = user.emailVerified
    this.legacy = user.legacyUser
    this.parent_verified = user.verifiedByParent
    this.hashed = user.hashed
    this.from_migrated_user = user.fromMigratedUser
  }
}

module.exports = MojangAccountProperties
