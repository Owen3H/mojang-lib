const colorToNumber = (color: string) => color === "green" ? 1 : (color === "yellow" ? 0.5 : 0)

/** 
 * Represents the status of Minecraft services
 */
class ServiceStatus {
  constructor(statuses: any) {
    const len = statuses.length
    for (let i = 0; i < len; i++) {
      const service = statuses[i]
      const first = Object.keys(service)[0]

      // @ts-ignore
      this[first] = colorToNumber(service[first])
    }
  }
}

export {
  ServiceStatus,
  ServiceStatus as default
}