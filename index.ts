import MCAPI_PLAYERS from './lib/apis/Players'
import MCAPI_MISC from './lib/apis/Misc'
import MCAPI_SERVERS from './lib/apis/Servers'
import MCAPI_ACCOUNTS from './lib/apis/Accounts'

// @ts-ignore
import { version } from './package.json'

class MCAPI {

  static readonly players = MCAPI_PLAYERS
  static readonly servers = MCAPI_SERVERS
  static readonly accounts = MCAPI_ACCOUNTS
  static readonly misc = MCAPI_MISC

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