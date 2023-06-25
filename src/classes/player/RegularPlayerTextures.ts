import { Base64 } from '../../utils/fn.js'

/** 
 * @class @desc Represents a minecraft player's skin and cape
 */
class RegularPlayerTextures {
  readonly player: any
  readonly uploaded_time: number

  skin_url: any
  cape_url: any
  slim: boolean

  constructor(textureData: any, player?: any) {
    const { textures, timestamp } = JSON.parse(Base64.decode(textureData))

    this.player = player
    this.uploaded_time = timestamp
    
    const skinTex = textures.SKIN,
          capeTex = textures.CAPE

    this.skin_url = skinTex?.url
    this.cape_url = capeTex?.url
    this.slim = skinTex?.metadata?.model === "slim"
  }
}

export {
  RegularPlayerTextures,
  RegularPlayerTextures as default
}
