import { Router } from 'express'
import errorMiddleware from '../middlewares/error.middleware'
import unauthMiddleware from '../middlewares/unauth.middleware'
import userRouter from './user'

const router = Router()

router.use('/user', userRouter)
router.use(unauthMiddleware)
router.use(errorMiddleware)
export default router
