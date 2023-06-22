const reqs = require('../utils/requests')
const MCAPIError = require('../utils/MCAPIError')
const MojangAccount = require('./../classes/MojangAccount')

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
   * @param  {String}  username_or_email The email or username (legacy accounts) of the user
   * @param  {String}  password          The password of the user
   * @return {Promise}                   Promise of an instance of MojangAccount {@see MojangAccount}
   */
  static async login(username_or_email, password) {
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

    const body = await reqs.POST("https://authserver.mojang.com/authenticate", { payload }).catch((err) => {
        if (err instanceof MCAPIError && err.code === 403) reject(new MCAPIError(404, "(account login) Username or password not recognized"))
        else if (err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(account login) You have reached the API request limit"))
        else reject(err)
    })

    const account = new MojangAccount(body)

    const accProfiles = account.profiles
    const profiles = this.LOAD_ALL_MC_ACCOUNTS ? accProfiles.list : [accProfiles.selected]
    const len = profiles.length

    for (let i = 0; i < len; i++) {
      const { player, game } = profiles[i]
      if (!player && game === "minecraft")
        await profile.loadPlayer()
    }

    return account
  }
}

module.exports = MCAPI_ACCOUNTS
