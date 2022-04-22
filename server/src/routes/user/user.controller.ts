import { Request, Response } from 'express'
import UserService from './user.service'

export default class UserController {
  static async registration(req: Request, res: Response) {
    try {
      const userData = await UserService.signup(req.body)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 3600 * 1000,
        httpOnly: true,
      })
      res.json({ success: true, message: 'Пользователь успешно создан', data: userData })
    } catch (error) {
      console.log(error)
    }
  }
  static async login(req: Request, res: Response){
    
  }
}
