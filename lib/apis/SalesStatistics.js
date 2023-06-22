import reqs from '../utils/requests'
import SalesOverview from './../classes/SalesOverview'
import MCAPIError from '../utils/MCAPIError'


/**
 * @function get_sales_stats_by_name - Get the sales for a given type of sales
 *
 * @param  {String} sales_type_api The sales type name for the Mojang API
 * @param  {String} sales_name     The name to output as
 */
function get_sales_stats_by_name(sales_type_api, sales_name) {
  return new Promise((resolve, reject) => {
    reqs.POST("https://api.mojang.com/orders/statistics", { payload: { "metricKeys": [ sales_type_api ] }, is_json: true })
      .then(body => resolve(new SalesOverview(sales_name, body)))
      .catch((err) => {
        if(err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(all statistics fetcher) You have reached the API request limit"))
        else reject(err)
      })
    })
}

class MCAPI_MISC {

  /**
   * @static @method all - Get alls metrics
   */
  static async all() {
    try {
      const sold_items_stats = await this.sold()
      const prepaid_cards_stats = await this.prepaid_cards()

      return {
        sold_items: sold_items_stats,
        prepaid_cards: prepaid_cards_stats
      }
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /**
   * @static @method sold - Stats of the sold games
   */
  static sold() {
    return new Promise((resolve, reject) => {
      get_sales_stats_by_name("item_sold_minecraft", "sold_items")
        .then(resolve)
        .catch(reject)
    })
  }

  /**
   * @static @method prepaid_cards - Stats of the prepaid cards sales
   */
  static prepaid_cards() {
    return new Promise((resolve, reject) => {
      get_sales_stats_by_name("prepaid_card_redeemed_minecraft", "prepaid_cards")
        .then(resolve)
        .catch(reject)
    })
  }
}

export {
  MCAPI_MISC,
  MCAPI_MISC as default
}