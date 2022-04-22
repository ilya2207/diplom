export default class ApiError extends Error {
  status: number
  errors: any[]
  constructor(status, message, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static unauthError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static badRequest(message: string, errors = []) {
    return new ApiError(400, message, errors)
  }
}