import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import OrderController from '../handlers/order/order.controller'

const orderRouter = Router()

orderRouter.use(
  expressjwt({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
  })
)
orderRouter.get('/', OrderController.show)
orderRouter.post('/', OrderController.add)
// orderRouter.post('/:detailId', OrderController.show)

export default orderRouter
