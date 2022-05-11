import { Detail } from '@prisma/client'
import ApiError from '../../exceptions/api-error'
import prisma from '../../prisma'
import { IFilterCondition, IShowDetails } from './detail.types'

export default class DetailService {
  static async show(
    filterCondition: IFilterCondition,
    pagination: { page: number; items: number }
  ) {
    const skip = pagination.page === 1 ? 0 : (pagination.page - 1) * pagination.items
    const details = await prisma.detail.findMany({
      skip,
      take: pagination.items,
      where: filterCondition,
    })
    const totalCount = await prisma.detail.count({
      where: filterCondition,
    })
    return { details, totalCount }
  }
  static async add(data) {
    const newDetail = await prisma.detail.create({
      data,
    })

    return newDetail
  }
  static async edit(id: string, data) {
    const newDetail = await prisma.detail.update({
      where: {
        id: +id,
      },
      data,
    })
    return newDetail
  }
  static async delete(id: number) {
    await prisma.detail.delete({
      where: {
        id,
      },
    })
  }

  static async updateStar(id: number, star: number) {
    const detail = await prisma.detail.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    })
    const starCount = detail._count.reviews
    const newStar = ((starCount - 1) * detail.star + star) / starCount
    await prisma.detail.update({
      where: {
        id,
      },
      data: {
        star: newStar,
      },
    })
  }
}
