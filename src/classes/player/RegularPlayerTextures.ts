import { Base64 } from '../../utils/fn.js'

/** 
 * Represents a Minecraft player's skin and cape.
 * To manipulate a player skin, use {@link LoggedPlayerTextures}.
 */
class RegularPlayerTextures {
  skin_url: any
  cape_url: any
  slim: boolean

  uploadedAt: number

  constructor(textureData: any) {
    const { textures, timestamp } = JSON.parse(Base64.decode(textureData))
    
    const skinTex = textures.SKIN
    const capeTex = textures.CAPE

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
