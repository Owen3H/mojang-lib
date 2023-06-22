const colorToNumber = color => color === "green" ? 1 : (color === "yellow" ? 0.5 : 0)

/**  @class
 * @desc Represents the status of the Minecraft services
 */
class ServiceStatus {
  constructor(statuses) {
    const len = statuses.length
    for (let i = 0; i < len; i++) {
      const service = statuses[i]
      const first = Object.keys(service)[0]

      this[first] = colorToNumber(service[first])
    }
  }
}

module.exports = ServiceStatus