import prisma from '../../prisma'
import { IBasket } from './basket.types'

export default class BasketService {
  static async addToBasket(basket: IBasket) {
    const newItem = await prisma.basket.create({
      data: basket,
    })
    return newItem
  }

  static async editInBasket(basketId: number, basket: IBasket) {
    const newItem = await prisma.basket.update({
      where: {
        id: basketId,
      },
      data: basket,
    })
    return newItem
  }

  static async deleteInBasket(basketId: number, basket: IBasket) {
    const newItem = await prisma.basket.update({
      where: {
        id: basketId,
      },
      data: basket,
    })
    return newItem
  }
}
