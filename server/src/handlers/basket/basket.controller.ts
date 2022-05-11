import { NextFunction, Request, Response } from 'express'
import { ExpressJwtRequest } from 'express-jwt'
import BasketService from './basket.service'
import { IBasketItem } from './basket.types'

export default class BasketController {
  static async getBasket(req: ExpressJwtRequest, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.auth.payload
      const basket = await BasketService.getBasket(+userId)
      return res.json(basket)
    } catch (error) {
      next(error)
    }
  }
  static async addBasketItem(req: ExpressJwtRequest, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.auth.payload

      const basketItem = req.body as IBasketItem
      const userBasketId = await BasketService.getBasketByUserId(userId)
      const newBasketItem = await BasketService.addBasketItem(basketItem, userBasketId)
      return res.json(newBasketItem)
    } catch (error) {
      next(error)
    }
  }
  static async editBasketItem(req: ExpressJwtRequest, res: Response, next: NextFunction) {
    try {
      const basketItem = req.body as IBasketItem
      const newBasketItem = await BasketService.editBasketItem(basketItem.id, basketItem)
      return res.json(newBasketItem)
    } catch (error) {
      next(error)
    }
  }
  static async deleteBasketItem(req: ExpressJwtRequest, res: Response, next: NextFunction) {
    try {
      const basketItemId = req.params.itemId
      const deletedBasketItem = await BasketService.deleteBasketItem(+basketItemId)
      return res.json('Успешно')
    } catch (error) {
      next(error)
    }
  }
}
