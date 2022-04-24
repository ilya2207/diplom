import { Router } from 'express'
import errorMiddleware from '../middlewares/error.middleware'
import unauthMiddleware from '../middlewares/unauth.middleware'
import userRouter from './user'
import fileupload from 'express-fileupload'
import categoryRouter from './category'
import imageRouter from './image'
import modelRouter from './model'

const router = Router()

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/image', imageRouter)
router.use('/model', modelRouter)
router.use(unauthMiddleware)
router.use(errorMiddleware)
export default router
