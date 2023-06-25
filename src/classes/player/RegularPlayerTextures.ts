import { Base64 } from '../../utils/fn.js'

/** 
 * @class @desc Represents a minecraft player's skin and cape
 */
class RegularPlayerTextures {
  skin_url: any
  cape_url: any
  slim: boolean

  readonly uploaded_time: number

  constructor(textureData: any) {
    const { textures, timestamp } = JSON.parse(Base64.decode(textureData))
    
    const skinTex = textures.SKIN,
          capeTex = textures.CAPE

    this.skin_url = skinTex?.url
    this.cape_url = capeTex?.url
    this.slim = skinTex?.metadata?.model === "slim"
    this.uploaded_time = timestamp
  }
}

export {
  RegularPlayerTextures,
  RegularPlayerTextures as default
}
