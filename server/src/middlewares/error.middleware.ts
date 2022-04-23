import { NextFunction, Request, Response } from 'express'
import ApiError from '../exceptions/api-error'

function errorMiddleware(err: ApiError, _req: Request, res: Response, _next: NextFunction) {
  console.log(err)
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }

  return res.status(500).json({ message: 'Ошибка' })
}

export default errorMiddleware
