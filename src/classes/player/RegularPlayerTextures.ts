import { Base64 } from '../../utils/fn.js'

/** 
 * Represents a Minecraft player's skin and cape.
 * 
 * Holds readonly info. Properties of this class are not directly writable.
 * To manipulate a player skin, use {@link LoggedPlayerTextures} instead.
 */
class RegularPlayerTextures {
  protected skin_url: any
  protected cape_url: any
  protected slim: boolean

  protected uploadedAt: number

  constructor(textureData: any) {
    const { textures, timestamp } = JSON.parse(Base64.decode(textureData))
    
    const skinTex = textures.SKIN,
          capeTex = textures.CAPE

    this.skin_url = skinTex?.url
    this.cape_url = capeTex?.url
    this.slim = skinTex?.metadata?.model === "slim"
    this.uploadedAt = timestamp
  }

  getAttributes = () => ({ skinURL: this.skin_url, slim: this.slim })
  setAttributes = (slim: boolean, skinUrl: string) => {
    this.slim = slim
    this.skin_url = skinUrl
  }
}

export {
  RegularPlayerTextures,
  RegularPlayerTextures as default
}
