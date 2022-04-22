import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import { body } from 'express-validator'
import { JWT_ACCESS_SECRET } from '../../constants'
import UserController from './user.controller'

const userRouter = Router()

userRouter.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.registration
)

userRouter.post('/login', UserController.login)

userRouter.post(
  '/logout',
  expressjwt({
    secret: JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
  }),
  UserController.logout
)

export default userRouter
