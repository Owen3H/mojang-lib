/**
 * @internal
 */
class MCAPIError extends Error {
  readonly code: number
  readonly date: Date

  constructor(http_code: number, ...params: any[]) {
    super(...params)

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, MCAPIError)

    this.code = http_code
    this.date = new Date()
  }
}

export {
  MCAPIError,
  MCAPIError as default
}