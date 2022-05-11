import { Router } from 'express'
import errorMiddleware from '../middlewares/error.middleware'
import unauthMiddleware from '../middlewares/unauth.middleware'
import userRouter from './user'
import categoryRouter from './category'
import modelRouter from './model'
import detailRouter from './detail'
import reviewRouter from './review'
import orderRouter from './order'
import basketRouter from './basket'

const router = Router()

router.use('/detail', detailRouter)
router.use('/category', categoryRouter)
router.use('/model', modelRouter)
router.use('/user', userRouter)
router.use('/review', reviewRouter)
router.use('/order', orderRouter)
router.use('/basket', basketRouter)
router.use(unauthMiddleware)
router.use(errorMiddleware)
export default router
