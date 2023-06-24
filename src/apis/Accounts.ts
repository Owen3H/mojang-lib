import reqs from '../utils/requests'
import MCAPIError from '../utils/MCAPIError'
import MojangAccount from '../classes/account/MojangAccount'
import MinecraftProfile from '../classes/profile/MinecraftProfile'

var LOAD_ALL_MC_ACCOUNTS = false

class MCAPI_ACCOUNTS {
  static get LOAD_ALL_MC_ACCOUNTS() {
    return LOAD_ALL_MC_ACCOUNTS
  }

  static set LOAD_ALL_MC_ACCOUNTS(value) {
    LOAD_ALL_MC_ACCOUNTS = !!value
  }

  /**
   * @public @static @method login - Logs a user in
   *
   * @param  { String } username_or_email The email or username (legacy accounts) of the user
   * @param  { String } password The password of the user
   * @return { Promise } Promise of an instance of MojangAccount { @see MojangAccount }
   */
  static async login(username_or_email: string, password: string) {
    if (!username_or_email || !password)
      return new MCAPIError(400, "(account login) The username and the password must be filled")

    const payload = {
      username: username_or_email,
      password: password,
      requestUser: true,
      agent: { 
        name: "Minecraft", 
        version: 1 
      }
    }

    const body = await reqs.POST("https://authserver.mojang.com/authenticate", { payload }).catch(err => {
        if (!(err instanceof MCAPIError)) return err
        const msg = err.code == 429 
          ? "(account login) You have reached the API request limit"
          : "(account login) Username or password not recognized"

        return new MCAPIError(err.code, msg)
    })

    if (!body) {
      console.error(body)
      return null
    }
    
    const account = new MojangAccount(body),
          accProfiles = account.profiles,
          profiles = this.LOAD_ALL_MC_ACCOUNTS ? accProfiles.list : [accProfiles.selected],
          len = profiles.length

    for (let i = 0; i < len; i++) {
      const profile = profiles[i]
      if (!(profile instanceof MinecraftProfile)) continue
      if (!profile.player || profile.game == "minecraft")
          await profile.loadPlayer()
    }

    return account
  }
}

export {
  MCAPI_ACCOUNTS,
  MCAPI_ACCOUNTS as default
}
