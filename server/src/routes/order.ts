import { Router } from 'express'
import OrderController from '../handlers/order/order.controller'

const orderRouter = Router()

orderRouter.get('/:detailId', OrderController.show)
orderRouter.post('/:detailId', OrderController.show)
orderRouter.post('/:detailId', OrderController.show)

export default orderRouter
