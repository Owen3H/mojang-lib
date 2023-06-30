import MCAPI_PLAYERS from './apis/Players.js'
import MCAPI_SERVERS from './apis/Servers.js'
import MCAPI_ACCOUNTS from './apis/Accounts.js'

/**
 * @public
 * 
 * The main entry point for this package.
 * Core functionality can be accessed through static properties within this class.
 */
class MCAPI {
  static readonly accounts = MCAPI_ACCOUNTS
  static readonly players  = MCAPI_PLAYERS
  static readonly servers  = MCAPI_SERVERS

  /**
   * @readonly
   * The current package version
   */
  static get version() {
    return globalThis.process?.env?.npm_package_version
  }
}

export {
  MCAPI,
  MCAPI as default,
  MCAPI_ACCOUNTS as accounts,
  MCAPI_PLAYERS as players,
  MCAPI_SERVERS as servers
}