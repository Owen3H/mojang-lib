const Base64 = require('js-base64').Base64

/** @class
 * @desc Represents a minecraft player's skin and cape
 */
class RegularPlayerTextures {
  constructor(data, player) {
    const texture_data = JSON.parse(Base64.decode(data))

    this.player = player
    this.uploaded_time = texture_data.timestamp
    
    const skinTex = texture_data.textures.SKIN,
          capeTex = texture_data.textures.CAPE

    this.skin_url = skinTex?.url
    this.cape_url = capeTex?.url
    this.slim = skinTex?.metadata?.model ? true : false
  }
}

module.exports = RegularPlayerTextures
