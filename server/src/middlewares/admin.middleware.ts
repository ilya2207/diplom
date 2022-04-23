import { NextFunction, Request, Response } from 'express'
import { ExpressJwtRequest } from 'express-jwt'
import ApiError from '../exceptions/api-error'
import { TokenData } from '../types/types'

function adminMiddleware(req: ExpressJwtRequest, res: Response, next: NextFunction) {
  try {
    const { type } = req.auth.payload
    if (type === 'User') return next(ApiError.forbiddenError())
    next()
  } catch (error) {
    next(error)
  }
}

export default adminMiddleware
