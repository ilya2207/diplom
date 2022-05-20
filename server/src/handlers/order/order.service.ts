import { BasketItem } from '@prisma/client'
import prisma from '../../prisma'
import { IBasketItemsToOrder, OrderStatusType } from './order.types'

export default class OrderService {
  static async show(userId: number) {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: {
          include: {
            detail: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    })
    return orders
  }

  static async createOrder(
    basketData: {
      basketItems: IBasketItemsToOrder[]
      basketId: number
    },
    userId: number
  ) {
    const orderItems = {
      createMany: { data: [] },
    }
    let totalPrice = 0
    for (let index = 0; index < basketData.basketItems.length; index++) {
      const {
        amount,
        detailId,
        detail: { price },
      } = basketData.basketItems[index]
      totalPrice += amount * price
      orderItems.createMany.data.push({
        amount,
        detailId,
      })
    }
    const orderNumber = `${Math.random().toString().slice(-8)}`

    const order = await prisma.order.create({
      data: {
        totalPrice,
        userId,
        orderItems,
        orderNumber,
      },
    })
    return order
  }

  static async edit(
    orderId: number,
    { status, rejectedReason }: { status: OrderStatusType; rejectedReason: string }
  ) {
    const updatedItem = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
        rejectedReason,
      },
    })
    return updatedItem
  }
  static async delete(orderId: number) {
    await prisma.order.delete({
      where: {
        id: orderId,
      },
    })
  }

  static async searchByOrderNumber(searchStr: string) {
    const result = await prisma.order.findMany({
      where: {
        OR: [
          {
            user: {
              phone: {
                contains: searchStr,
              },
            },
          },
          {
            orderNumber: {
              contains: searchStr,
            },
          },
        ],
      },
      include: {
        orderItems: {
          include: {
            detail: true,
          },
        },
      },
    })
    return result
  }
}
