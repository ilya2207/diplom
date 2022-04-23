import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import { body } from 'express-validator'
import { JWT_ACCESS_SECRET } from '../constants'
import UserController from '../handlers/user/user.controller'

const userRouter = Router()

userRouter.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.registration
)

userRouter.post('/login', UserController.login)
userRouter.use(
  expressjwt({
    secret: JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
  })
)
userRouter.post('/logout', UserController.logout)
userRouter.post('/refresh', UserController.refresh)

export default userRouter
