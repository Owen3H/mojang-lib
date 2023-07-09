import reqs from '../utils/requests.js'
import SalesOverview from './SalesOverview.js'
import MCAPIError from '../utils/MCAPIError.js'

/** 
 *   Gather Mojang statistics on game sales.
 *  - **NO LONGER WORKS** as Mojang removed statistics endpoint.
 *  @see https://twitter.com/Mojang_Ined/status/1501541417784852484
 */
class MCAPI_MISC {

  /**
  * @static @method salesStatsByName - Get sales for the given sales type.
  *
  * @param type The sales type name for the Mojang API
  * @param name The name to output as
  */
  static salesStatsByName = async (type: string, name: string) => {
    const res = await reqs.POST("https://api.mojang.com/orders/statistics", { 
        payload: { "metricKeys": [type] } 
    }).catch(e => {
      if (e.statusCode == 429)
        throw new MCAPIError(429, "(all statistics fetcher) You have reached the API request limit")

      throw e 
    })

    return new SalesOverview(name, await res.body.json())
  }

  /**
   * @static @method all - Get alls metrics
   */
  static all = async () => {
    const sold_items_stats = await this.sold().catch(console.error)
    const prepaid_cards_stats = await this.prepaid_cards().catch(console.error)

    return {
      sold_items: sold_items_stats,
      prepaid_cards: prepaid_cards_stats
    }
  }

  /**
   * @static @method sold - Stats of sold games
   */
  static sold = () => this.salesStatsByName("item_sold_minecraft", "sold_items")

  /**
   * @static @method prepaid_cards - Stats of prepaid cards sales
   */
  static prepaid_cards = () => this.salesStatsByName("prepaid_card_redeemed_minecraft", "prepaid_cards")
}

export {
  MCAPI_MISC,
  MCAPI_MISC as default
}