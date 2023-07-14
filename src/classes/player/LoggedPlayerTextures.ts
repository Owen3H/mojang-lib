import reqs from '../../utils/requests.js'
import MCAPIError from '../../utils/MCAPIError.js'

import RegularPlayerTextures from './RegularPlayerTextures.js'
import { skins } from '../../endpoints.json'

/** 
 * Represents skin and cape of a logged in player.
 * - Extends {@link RegularPlayerTextures} to be able to manipulate skin
 */
class LoggedPlayerTextures extends RegularPlayerTextures {
  readonly associatedAccount: any

  #authHeader: {}

  constructor(data: any, associatedAcc: any) {
    super(data)

    this.associatedAccount = associatedAcc
    this.#authHeader = { 
      Authorization: `Bearer ${associatedAcc.tokens.access}`
    }
  }

  /**
   * @public
   * Removes the current skin and sets it to default (Steve).
   */
  resetSkin = async () => {
    const res = await reqs.DELETE(skins.active, { headers: this.#authHeader })

    if (res instanceof MCAPIError) {
      if (res.code === 429) {
        console.error(new MCAPIError(429, "[Skin Reset] - You have reached the API request limit"))
        return false
      }
    }

    if (res.statusCode !== 204) {
      console.error(new MCAPIError(res.statusCode, '[Skin Reset] - An error occurred sending request.'))
      return false
    }

    this.skin_url = null
    return true
  }

  /**
   * Upload a skin to Mojang servers.
   * 
   * **NOTE** - This will also overwrite the currently active skin!
   * 
   * @param file The PNG file that will be uploaded.
   * @param slim Whether or not the skin should be slim or classic.
   * 
   * @returns
   * A {@link Boolean} indicatating if the upload was successful,
   * `false` is also returned if the file input is not a valid PNG.
   */
  uploadSkin = async (file: string | File | Buffer, slim = false) => {
    if (!file) {
      console.error(new MCAPIError(400, `A valid PNG file must be provided! '${file}' was passed.`))
      return false
    }

    //#region Handle MIME type validation
    

    //#endregion

    const res = await reqs.POST(skins.list, { payload: file, headers: this.#authHeader })
    if (!res) {
      console.error(new MCAPIError(404, `[Upload Skin] - Could not send the request, received ${res}`))
      return false
    }

    return true
  }

  /**
   * 
   * @param url The URL of the new skin, e.g. http://assets.mojang.com/SkinTemplates/steve.png
   * @param slim Whether or not the skin should be slim or classic.
   * 
   * @beta
   */
  useSkinFromURL = async (url: string, slim = false) => {
    if (!url) {
      console.error(new MCAPIError(400, `Valid URL must be provided! '${url}' was passed.`))
      return false
    }

    const _slim = slim || (this.slim ?? false)
    const body = `variant="${(_slim ? "slim" : "classic")}"&url=${url}`

    const res = await reqs.POST(skins.list, { payload: body, headers: this.#authHeader }).then(() => {
        this.setAttributes(_slim, url)
        return true
    }).catch((err: Error) => {
      if (!(err instanceof MCAPIError)) {
        console.error(err)
        return false
      }
        
      // No content (as expected)
      if (err.code === 204) {
        this.setAttributes(_slim, url)
        return true
      }
      
      const errPrefix = '[Skin from URL] - '
      const msg = err.code === 429 
          ? `You have reached the API request limit`
          : `The image couldn't be retrieved from the url`
          
      console.error(new MCAPIError(err.code, `${errPrefix}${msg}`))
      return false
    })

    return res
  }
}

export {
  LoggedPlayerTextures,
  LoggedPlayerTextures as default
} 
