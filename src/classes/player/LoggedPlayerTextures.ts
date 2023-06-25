import reqs from '../../utils/requests.js'
import MCAPIError from '../../utils/MCAPIError.js'

import RegularPlayerTextures from './RegularPlayerTextures.js'

/** 
 * @class @desc Represents skin and cape of a logged in player.
 * - Extends { @link RegularPlayerTextures } to be able to manipulate skin
 */
class LoggedPlayerTextures extends RegularPlayerTextures {
  readonly associated_account: any
  readonly player: any

  //@ts-ignore
  #_auth_header: {}

  constructor(data: any, player: any, associated_account: any) {
    super(data)

    this.player = player
    this.associated_account = associated_account

    this.#_auth_header = { 
      "Authorization": `Bearer ${associated_account._tokens.access}`
    }
  }

  getAttributes = () => ({ skinURL: this.skin_url, slim: this.slim })
  setAttributes = (slim: boolean, skinUrl: string) => {
    this.slim = slim
    this.skin_url = skinUrl
  }

  uploadSkin = async (url: string, slim = false) => {
    if (!url) {
      console.error(new MCAPIError(400, "You must provide a url"))
      return null
    }

    const res = await reqs.POST(url, { headers: this.#_auth_header })
    return res.statusCode
  }
  
  resetSkin = async (): Promise<boolean | MCAPIError> => {
    const url = `https://api.mojang.com/user/profile/${this.player.uuid}/skin`
    const res = await reqs.DELETE(url, { headers: this.#_auth_header })

    if (res instanceof MCAPIError) {
      if (res.statusCode === 429) {
        console.error(new MCAPIError(429, "(skin reset) You have reached the API request limit"))
        return false
      }
    }

    if (res.statusCode !== 204) {
      console.error(new MCAPIError(res.statusCode, '(skin reset) An error occurred sending request.'))
      return false
    }

    this.skin_url = null
    return true
  }

  useSkinFromURL(url: string, slim: boolean) {
    return new Promise((resolve, reject) => {
      if (!url) return reject(new MCAPIError(400, "You must provide a url"))

      let SLIM = this.slim
      if (slim !== undefined) {
        SLIM = slim ? true : false
      }

      const endpoint = `https://api.mojang.com/user/profile/${this.player.uuid}/skin`
      const body = `model="${(SLIM ? "slim" : "")}"&url=${url}`

      reqs.POST(endpoint, { 
        payload: body,
        headers: this.#_auth_header 
      }).then(() => {
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
