import { Router } from 'express'
import { body } from 'express-validator'
import UserController from './user.controller'

const userRouter = Router()

userRouter.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.registration
)

export default userRouter
