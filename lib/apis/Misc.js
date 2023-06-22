const reqs = require('../utils/requests')
const ServiceStatus = require('./../classes/ServiceStatus')

const MCAPI_MISC_STATS = require('./SalesStatistics')
 
class MCAPI_MISC {

  /**
   * @static @attribute stats - Minecraft sales statistics
   */
  static get stats() {
    return MCAPI_MISC_STATS
  }

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

module.exports = MCAPI_MISC
