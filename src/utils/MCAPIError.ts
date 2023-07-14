/**
 * @internal
 */
class MCAPIError extends Error {
  readonly code: number
  readonly date: Date

  constructor(httpCode: number, ...params: any[]) {
    super(...params)

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, MCAPIError)

    this.code = httpCode
    this.date = new Date()
  }
}

export {
  MCAPIError,
  MCAPIError as default
}