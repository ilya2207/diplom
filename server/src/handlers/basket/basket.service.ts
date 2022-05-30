import prisma from '../../prisma'
import { IBasket, IBasketItem } from './basket.types'

export default class BasketService {
  static async createBasket(userId: number) {
    const newBasket = await prisma.basket.create({
      data: {
        userId,
      },
    })
    return newBasket
  }

  static async getBasketByUserId(userId: number) {
    const basket = await prisma.basket.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    })
    return basket.id
  }

  static async addBasketItem(item: IBasketItem, basketId: number) {
    const isItemExists = await prisma.basket.findUnique({
      where: {
        id: basketId,
      },
      select: {
        basketItems: {
          where: {
            detailId: item.detailId,
          },
        },
      },
    })

    if (isItemExists.basketItems.length !== 0) {
      const newItem = await prisma.basketItem.update({
        where: {
          id: isItemExists.basketItems[0].id,
        },
        data: {
          amount: {
            increment: item.amount,
          },
        },
      })
      return newItem
    }

    const newItem = await prisma.basketItem.create({
      data: {
        ...item,
        basketId,
      },
    })
    return newItem
  }

  static async getBasket(userId: number) {
    const basket = await prisma.basket.findUnique({
      where: {
        userId,
      },
      select: {
        basketItems: {
          orderBy: {
            id: 'asc',
          },
          select: {
            amount: true,
            id: true,
            detail: {
              select: {
                id: true,
                img: true,
                price: true,
                title: true,
              },
            },
          },
        },
      },
    })
    return basket
  }

  static async editBasketItem(basketItemId: number, basket: IBasketItem) {
    const newItem = await prisma.basketItem.update({
      where: {
        id: basketItemId,
      },
      data: basket,
    })

    return newItem
  }

  static async deleteBasketItem(basketItemId: number) {
    const newItem = await prisma.basketItem.delete({
      where: {
        id: basketItemId,
      },
    })
    return newItem
  }

  static async getAllItemsByUserId(userId: number) {
    const basketId = await this.getBasketByUserId(userId)
    const basketItems = await prisma.basketItem.findMany({
      where: {
        basketId,
      },
      select: {
        amount: true,
        detailId: true,
        detail: {
          select: {
            price: true,
          },
        },
      },
    })

    return { basketItems, basketId }
  }

  static async deleteBasketItemsByBasketId(basketId: number) {
    const items = await prisma.basketItem.deleteMany({
      where: {
        basketId,
      },
    })
    return items
  }
}
