/**  
 * Represents a Mojang account's general properties
 */
class MojangAccountProperties {
  readonly suspended: boolean
  readonly blocked: boolean
  readonly secured: boolean

  readonly legacy: boolean
  readonly migrated: boolean
  readonly migratedUser: boolean

  readonly hashed: boolean
  readonly emailVerified: boolean
  readonly parentVerified: boolean

  constructor(data: any) {
    const { user } = data

    this.suspended = user.suspended
    this.blocked = user.blocked
    this.secured = user.secured

    this.legacy = user.legacyUser
    this.migrated = user.migrated
    this.migratedUser = user.fromMigratedUser

    this.hashed = user.hashed
    this.emailVerified = user.emailVerified
    this.parentVerified = user.verifiedByParent
  }
}

export { 
  MojangAccountProperties,
  MojangAccountProperties as default
} 
