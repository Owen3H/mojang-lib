import reqs from '../utils/requests'
import MCAPIError from '../utils/MCAPIError'

import RegularPlayerTextures from './RegularPlayerTextures'

/** @class
 * @desc Represents a logged in minecraft player's skin and cape
 *
 * Difference from RegularPlayerTextures : extended to be able to manipulate skin
 */
class LoggedPlayerTextures extends RegularPlayerTextures {
  associated_account: any
  #_auth_header: {}
  
  player: any
  slim: boolean
  skin_url: string

  constructor(data: any, player: any, associated_account: any) {
    super(data)

    this.player = player
    this.associated_account = associated_account

    this.#_auth_header = { 
      "Authorization": `Bearer ${associated_account._tokens.access}`
    }
  }

  uploadSkin = (url: string) => "WIP"
  resetSkin = async (): Promise<void | MCAPIError> => {
    const url = `https://api.mojang.com/user/profile/${this.player.uuid}/skin`
    const res = await reqs.DELETE(url, { headers: this.#_auth_header })

    if (res instanceof MCAPIError) {
      if (res.statusCode === 429)
        return new MCAPIError(429, "(skin reset) You have reached the API request limit")

      if (res.statusCode !== 204) 
        return res
    }
    
    this.skin_url = null
  }

  setAttributes = (slim: boolean, skinUrl: string) => {
    this.slim = slim
    this.skin_url = skinUrl
  }

  use_url_skin(url: string, slim: null | undefined | boolean) {
    return new Promise((resolve, reject) => {
      if (!url) return reject(new MCAPIError(400, "You must provide a url"))

      let SLIM = this.slim
      if (slim !== undefined) {
        SLIM = slim ? true : false
      }

      const endpoint = `https://api.mojang.com/user/profile/${this.player.uuid}/skin`
      const body = `model="${(SLIM ? "slim" : "")}"&url=${url}`

      reqs.POST(endpoint, { body, headers: this.#_auth_header }).then(() => {
          this.setAttributes(SLIM, url)
          resolve(url)
      }).catch((err: Error) => {
        if (!(err instanceof MCAPIError))
          return reject(err)
          
        // No content, as expected
        if (err.code === 204) {
          this.setAttributes(SLIM, url)
          return resolve(url)
        }
        
        const msg = err.code === 429 
            ? "(skin from url) You have reached the API request limit"
            : "(skin from url) The image couldn't be retrieved from the url"
            
        return reject(new MCAPIError(err.code, msg))
      })
    })
  }
}

export {
  LoggedPlayerTextures,
  LoggedPlayerTextures as default
} 
