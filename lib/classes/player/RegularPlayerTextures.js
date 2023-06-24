import { decode } from 'js-base64'

/** 
 * @class @desc Represents a minecraft player's skin and cape
 */
class RegularPlayerTextures {
  constructor(textureData, player) {
    const textureData = JSON.parse(decode(data))

    this.player = player
    this.uploaded_time = textureData.timestamp
    
    const skinTex = textureData.textures.SKIN,
          capeTex = textureData.textures.CAPE

    this.skin_url = skinTex?.url
    this.cape_url = capeTex?.url
    this.slim = skinTex?.metadata?.model === "slim"
  }
}

export {
  RegularPlayerTextures,
  RegularPlayerTextures as default
}
