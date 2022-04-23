import 'dotenv/config'
import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import { body } from 'express-validator'
import UserController from '../handlers/user/user.controller'

const userRouter = Router()

userRouter.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.registration
)
userRouter.post('/login', UserController.login)
userRouter.post('/refresh', UserController.refresh)
userRouter.use(
  expressjwt({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
  })
)
userRouter.post('/logout', UserController.logout)
userRouter.post('/edit', UserController.edit)

export default userRouter
