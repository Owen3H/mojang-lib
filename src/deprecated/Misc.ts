import reqs from '../utils/requests.js'
import ServiceStatus from '../classes/misc/ServiceStatus.js'

import MCAPI_MISC_STATS from './SalesStatistics.js'
import MCAPIError from '../utils/MCAPIError.js'
 
class MCAPI_MISC {

  /**
   * @static @attribute stats - Minecraft sales statistics
   */
  static readonly stats = MCAPI_MISC_STATS

  /**
   * @static @method fetchStatus - Get the status of the Mojang's services
   */
  static fetchStatus = async () => { 
    try {
      const status = await reqs.GET("https://status.mojang.com/check")
      return new ServiceStatus(status)
    } catch (e) {
      let err = e
      if (e instanceof MCAPIError && e.code === 429) 
        err = new MCAPIError(429, "[Status Fetcher] - You have reached the API request limit!")

      console.error(err)
      return null
    }
  }
}

export {
   MCAPI_MISC,
   MCAPI_MISC as default
}
