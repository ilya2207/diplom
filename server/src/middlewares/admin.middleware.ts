import { NextFunction, Request, Response } from 'express'
import { ExpressJwtRequest } from 'express-jwt'
import ApiError from '../exceptions/api-error'
import { TokenData } from '../types/types'

function adminMiddleware(req: ExpressJwtRequest, _res: Response, next: NextFunction) {
  try {
    const { type }: TokenData = req.auth.payload
    if (type === 'user') return next(ApiError.forbiddenError())
    next()
  } catch (error) {
    next(error)
  }
}

export default adminMiddleware
