import { BasketItem } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { ExpressJwtRequest } from 'express-jwt'
import ApiError from '../../exceptions/api-error'
import BasketService from '../basket/basket.service'
import OrderService from './order.service'

export default class OrderController {
  static async show(req: ExpressJwtRequest, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.auth.payload

      const orders = await OrderService.show(userId)
      return res.json(orders)
    } catch (error) {
      next(error)
    }
  }
  static async add(req: ExpressJwtRequest, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.auth.payload
      const basketItems = await BasketService.getAllItemsByUserId(userId)
      if (basketItems.basketItems.length === 0) next(ApiError.badRequest('Корзина пуста'))
      const order = await OrderService.createOrder(basketItems, userId)
      await BasketService.deleteBasketItemsByBasketId(basketItems.basketId)
      return res.json(order)
    } catch (error) {
      next(error)
    }
  }
  static async edit(req: ExpressJwtRequest, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId
      const body = req.body
      const updatedOrder = await OrderService.edit(+orderId, body)
      return res.json(updatedOrder)
    } catch (error) {
      next(error)
    }
  }
  static async delete(req: ExpressJwtRequest, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId
      await OrderService.delete(+orderId)
      return res.json('Успешно')
    } catch (error) {
      next(error)
    }
  }

  static async searchByOrderNumber(req: ExpressJwtRequest, res: Response, next: NextFunction) {
    try {
      const { orderNumber } = req.query
      const searchedItems = await OrderService.searchByOrderNumber(orderNumber.toString())
      return res.json(searchedItems)
    } catch (error) {
      next(error)
    }
  }
}
