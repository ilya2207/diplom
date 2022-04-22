import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ApiError from '../../exceptions/api-error'
import UserService from './user.service'

export default class UserController {
  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Ошибка при валидации', errors.array()))
      }
      const userData = await UserService.signup(req.body)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      })
      res.json({ success: true, message: 'Пользователь успешно создан', data: userData })
    } catch (error) {
      next(error)
    }
  }
  static async login(req: Request, res: Response) {}
}
