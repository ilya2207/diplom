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
    console.log(userId)

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
    const isItemExists = await prisma.basket.findMany({
      where: {
        id: basketId,
        basketItems: {
          some: {
            detailId: item.detailId,
          },
        },
      },
      include: {
        basketItems: true,
      },
    })

    if (isItemExists.length !== 0) {
      const newItem = await prisma.basketItem.update({
        where: {
          id: isItemExists[0].basketItems[0].id,
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
                shortDescription: true,
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
}
