import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { NextFunction, Request, Response } from 'express'
import ApiError from '../exceptions/api-error'

type Error = ApiError | PrismaClientKnownRequestError

function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.log(err.message)
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      // @ts-ignore
      const field = err.meta?.target
      return res.status(400).json({ message: 'Такие данные уже существуют', field: field })
    }
  }

  return res.status(500).json({ message: 'Ошибка' })
}

export default errorMiddleware
