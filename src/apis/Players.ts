import reqs from '../utils/requests.js'
import RegularPlayer from '../classes/player/RegularPlayer.js'
import MCAPIError from '../utils/MCAPIError.js'

class MCAPI_PLAYERS {
  /**
   * Get profile info of an unlogged user
   * @param username The user's name
   */
  static async get(username: string, raw = false): Promise<RegularPlayer> {
      try {
        const res = await reqs.GET("https://api.mojang.com/users/profiles/minecraft/" + username)
        const json = await res.body.json()

        return await this.getByUUID(json.id, raw)
      }
      catch(e) {
        this.handleError(e, 
          "[UUID Fetcher] - Username not recognized",
          "[UUID Fetcher] - You have reached the API request limit"
        )

        return null
      }
  }

  /**
   * Get profile info of an unlogged user by UUID.
   * @param uuid The user's uuid
   */
  static async getByUUID(uuid: string, raw?: boolean): Promise<RegularPlayer> {
    try {
      const res = await reqs.GET("https://sessionserver.mojang.com/session/minecraft/profile/" + uuid)
      const userData = await res.body.json()
      
      return raw ? userData : new RegularPlayer(userData)
    } catch(e) {
      this.handleError(e, 
        "[Textures Fetcher] - UUID not recognized",
        "[Textures Fetcher] - You have reached the API request limit"
      )
  
      return null
    }
  }

  private static handleError = (err: Error, msg1: string, msg2: string) => {
    if (err instanceof MCAPIError) {
      const msg = err.code == 429 ? msg2 : msg1
      err = new MCAPIError(err.code, msg)
    }

    console.error(err)
  }
}

export {
  MCAPI_PLAYERS,
  MCAPI_PLAYERS as default
}