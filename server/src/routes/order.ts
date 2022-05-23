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
orderRouter.get('/search', OrderController.searchByOrderNumber)
orderRouter.post('/', OrderController.add)
orderRouter.put('/:orderId', OrderController.edit)
orderRouter.delete('/:orderId', OrderController.delete)

export default orderRouter
