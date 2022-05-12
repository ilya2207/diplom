import { BasketItem } from '@prisma/client'
import prisma from '../../prisma'

export default class OrderService {
  static async show(userId: number) {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: true,
      },
    })
    return orders
  }
  static async createOrder(
    basketData: {
      basketItems: BasketItem[]
      basketId: number
    },
    userId: number
  ) {
    const orderItems = {
      createMany: { data: [] },
    }
    const totalPrice = 0
    for (let index = 0; index < basketData.basketItems.length; index++) {
      const { amount, detailId } = basketData.basketItems[index]
      orderItems.createMany.data.push({
        amount,
        detailId,
      })
    }

    const order = await prisma.order.create({
      data: {
        totalPrice: 0,
        userId,
        orderItems,
      },
    })
    return order
  }

  static async edit() {}
  static async delete() {}
}
