import { Router } from 'express'
import { expressjwt } from 'express-jwt'
import BasketController from '../handlers/basket/basket.controller'
import CategoryController from '../handlers/category/category.controller'
import adminMiddleware from '../middlewares/admin.middleware'

const basketRouter = Router()

basketRouter.use(
  expressjwt({
    secret: process.env.JWT_ACCESS_SECRET,
    algorithms: ['HS256'],
  })
)
basketRouter.get('/', BasketController.getBasket)
basketRouter.post('/', BasketController.addBasketItem)
basketRouter.put('/', BasketController.editBasketItem)
basketRouter.delete('/:itemId', BasketController.deleteBasketItem)
basketRouter.delete('/', BasketController.deleteBasketItemsAll)

export default basketRouter
