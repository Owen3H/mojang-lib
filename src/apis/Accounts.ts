import reqs from '../utils/requests.js'
import MCAPIError from '../utils/MCAPIError.js'
import MojangAccount from '../classes/account/MojangAccount.js'
import MinecraftProfile from '../classes/profile/MinecraftProfile.js'

/**
 * Holds static functions relating to account functionality.
 */
class MCAPI_ACCOUNTS {
  loadAll = false

  static get loadAll(): boolean {
    return this.loadAll
  }

  static set loadAll(value) {
    if (!value) this.loadAll = value
  }

  /**
   * Allows a user to login to their Mojang account.
   *
   * @public 
   * @param identity The email or username (legacy accounts) of the user
   * @param password The password of the user
   * 
   */
  static async login(identity: string, password: string) {
    if (!identity || !password)
      return new MCAPIError(400, "[Account Login] - Both identity and password are required!")

    const payload = {
      username: identity,
      password: password,
      requestUser: true,
      agent: { 
        name: "Minecraft", 
        version: 1 
      }
    }

    const body = await reqs.POST("https://authserver.mojang.com/authenticate", { payload }).catch(err => {
        if (!(err instanceof MCAPIError)) return err

        const errPrefix = "[Account Login] - "
        const msg = err.code == 429 
          ? "You have reached the API request limit."
          : "Identity and/or password not recognized."

        return new MCAPIError(err.code, `${errPrefix}${msg}`)
    })

    if (!body) {
      console.error(body)
      return null
    }
    
    const account = new MojangAccount(body),
          accProfiles = account.profiles,
          profiles = this.loadAll ? accProfiles.list : [accProfiles.selected],
          len = profiles.length

    for (let i = 0; i < len; i++) {
      const profile = profiles[i]
      if (profile instanceof MinecraftProfile) {
        if (!profile.player || profile.game == "minecraft")
          await profile.loadPlayer()
      }
    }

    return account
  }
}

export {
  MCAPI_ACCOUNTS,
  MCAPI_ACCOUNTS as default
}
