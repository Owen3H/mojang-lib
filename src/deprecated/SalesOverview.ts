/** 
 * @class  Represents statistics on sales
 *
 * Using same structure as Mojang's response body
 */
class SalesOverview {
  readonly type: any

  constructor(salesType: any, data: SalesData) {
    this.type = salesType
    Object.assign(this, data)
  }
}

type SalesData = {
  total: number
  last24h: number 
  velocity: any
}

export {
  SalesOverview,
  SalesOverview as default
}
