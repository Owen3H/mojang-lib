import reqs from '../utils/requests.js'
import RegularPlayer from '../classes/player/RegularPlayer.js'
import MCAPIError from '../utils/MCAPIError.js'

class MCAPI_PLAYERS {
  /**
   * Get profile info of an unlogged user
   *
   * @param username The user's name
   */
  static get(username: string, raw = false): Promise<RegularPlayer> {
    return new Promise((resolve, reject) => {
      reqs.GET("https://api.mojang.com/users/profiles/minecraft/" + username)
        .then(async res => {
          const json = await res.body.json()
          this.getByUUID(json.id, raw).then(resolve).catch(reject)
        }).catch((err) => {
          if (err instanceof MCAPIError && err.code === 204) reject(new MCAPIError(204, "(uuid fetcher) Username not recognized"))
          else if (err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(uuid fetcher) You have reached the API request limit"))
          else reject(err)
        })
    })
  }

  /**
   * Get profile info of an unlogged user by UUID.
   *
   * @param uuid The user's uuid
   */
  static getByUUID = async (uuid: string, raw?: boolean): Promise<RegularPlayer> => {
    try {
      const res = await reqs.GET("https://sessionserver.mojang.com/session/minecraft/profile/" + uuid)
      const userData = await res.body.json()
      
      return raw ? userData : new RegularPlayer(userData)
    } catch(e) {
      if (!(e instanceof MCAPIError)) console.error(e)
      else {
        const msg = e.code == 429 
          ? "(textures fetcher) You have reached the API request limit"
          : "(textures fetcher) UUID not recognized"
  
        console.error(new MCAPIError(e.code, msg))
      }
  
      return null
    }
  }
}

export {
  MCAPI_PLAYERS,
  MCAPI_PLAYERS as default
}