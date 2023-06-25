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
  static fetchStatus = () => new Promise((resolve, reject) =>
    reqs.GET("https://status.mojang.com/check")
      .then(body => resolve(new ServiceStatus(body)))
      .catch((err) => {
        if (err instanceof MCAPIError && err.code === 429) 
          reject(new MCAPIError(429, "(status fetcher) You have reached the API request limit"))
        else reject(err)
      })
  )
}

export {
   MCAPI_MISC,
   MCAPI_MISC as default
}
