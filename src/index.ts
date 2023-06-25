import MCAPI_PLAYERS from './apis/Players.js'
import MCAPI_SERVERS from './apis/Servers.js'
import MCAPI_ACCOUNTS from './apis/Accounts.js'

// @ts-ignore
import { version } from '../package.json'

class MCAPI {
  static readonly accounts = MCAPI_ACCOUNTS
  static readonly players  = MCAPI_PLAYERS
  static readonly servers  = MCAPI_SERVERS

  /**
   * @static @attribute version - Current package version
   */
  static get version() {
    return process?.env?.npm_package_version ?? version
  }
}

export {
  MCAPI,
  MCAPI as default
}