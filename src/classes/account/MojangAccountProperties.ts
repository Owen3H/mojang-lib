/**  
 * @class Represents a Mojang account's general properties
 */
class MojangAccountProperties {
  [name: string]: boolean | string

  constructor(data: any) {
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

export { 
  MojangAccountProperties,
  MojangAccountProperties as default
} 
