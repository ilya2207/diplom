import { Router } from 'express'
import UserController from './user.controller'

const userRouter = Router()

userRouter.post('/signup', UserController.registration)

export default userRouter
