import { NextFunction, Request, Response } from 'express'
import ApiError from '../exceptions/api-error'

export default function unauthMiddleware(err, req: Request, res: Response, next: NextFunction) {
  if (err.name === 'UnauthorizedError') {
    next(ApiError.unauthError())
  } else {
    next(err)
  }
}
