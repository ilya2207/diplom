import prisma from '../../prisma'

export default class OrderService {
  static async show(userId: number) {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        basketItems: true,
      },
    })
    return orders
  }
  static async add() {}
  static async edit() {}
  static async delete() {}
}
