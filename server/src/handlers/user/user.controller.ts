import { NextFunction, Request, Response } from 'express'
import { ExpressJwtRequest } from 'express-jwt'
import { validationResult } from 'express-validator'
import ApiError from '../../exceptions/api-error'
import UserDTO from './user.dto'
import UserService from './user.service'
import { IUserEdit } from './user.types'

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
      res.json(userData)
    } catch (error) {
      next(error)
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone, password } = req.body
      const userData = await UserService.login(phone, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  static async logout(req: ExpressJwtRequest, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      await UserService.logout(req.auth.payload)
      res.clearCookie('refreshToken')
      return res.status(200).json({ message: 'Успешно' })
    } catch (error) {
      next(error)
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const userData = await UserService.refreshTokens(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json({ token: userData.accessToken })
    } catch (error) {
      next(error)
    }
  }

  static async edit(req: ExpressJwtRequest, res: Response, next: NextFunction) {
    try {
      const body: IUserEdit = req.body
      const userData = await UserService.editUser(req.auth.payload, body)
      const userDto = new UserDTO(userData)
      return res.json(userDto)
    } catch (error) {
      next(error)
    }
  }
}
