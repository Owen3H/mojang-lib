/** 
 * Represents the status of Minecraft services.
 */
class ServiceStatus {
  constructor(statuses: any) {
    for (const service of statuses) {
      const first = Object.keys(service)[0]

      // @ts-ignore
      this[first] = colorToNumber(service[first])
    }
  }
}

const colorToNumber = (color: string) => color === "green" ? 1 : (color === "yellow" ? 0.5 : 0)

export {
  ServiceStatus,
  ServiceStatus as default
}