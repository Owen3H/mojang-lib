import reqs from '../utils/requests'
import RegularPlayer from '../classes/player/RegularPlayer'
import MCAPIError from '../utils/MCAPIError'

const profileFromUUID = (uuid: string, option?: string) => {
  return new Promise((resolve, reject) => {
    reqs.GET("https://sessionserver.mojang.com/session/minecraft/profile/" + uuid).then((body: any) => {
        const userData = body
        const isRaw = option === "RAW_RESULTS"
        return resolve(isRaw ? userData : new RegularPlayer(userData))

        // reqs.GET("https://api.mojang.com/user/profiles/" + uuid + "/names").then(async res => {
        //     userData.name_history = await res.body.json()
        //   }).catch((err: any) => {
        //     if (err instanceof MCAPIError && err.code === 204) reject(new MCAPIError(204, "(username history fetcher) UUID not recognized"))
        //     else if (err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(username history fetcher) You have reached the API request limit"))
        //     else reject(err)
        //   })
      }).catch((err: any) => {
        if (!(err instanceof MCAPIError)) return reject(err)
        if (err.code === 204) return reject(new MCAPIError(204, "(textures fetcher) UUID not recognized"))
        if (err.code === 429)  return reject(new MCAPIError(429, "(textures fetcher) You have reached the API request limit"))
      })
  })
}

class MCAPI_PLAYERS {
  /**
   * @static @method get - Get profile info of an unlogged user
   *
   * @param { String } username The user's name
   */
  static get(username: string, option: string) {
    return new Promise((resolve, reject) => {
      reqs.GET("https://api.mojang.com/users/profiles/minecraft/" + username)
        .then(async res => {
          const json = await res.body.json()
          profileFromUUID(json.id, option).then(resolve).catch(reject)
        }).catch((err) => {
          if (err instanceof MCAPIError && err.code === 204) reject(new MCAPIError(204, "(uuid fetcher) Username not recognized"))
          else if (err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(uuid fetcher) You have reached the API request limit"))
          else reject(err)
        })
      })
  }

  /**
   * @static @method get_from_uuid - Get profile info of an unlogged user from its uuid
   *
   * @param { String } uuid The user's uuid
   */
  static get_from_uuid = (uuid: string, option: string) => profileFromUUID(uuid, option)
}

export {
  MCAPI_PLAYERS,
  MCAPI_PLAYERS as default
}