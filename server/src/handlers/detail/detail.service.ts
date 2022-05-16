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

  static async searchDetail(searchStr: string, { page, items }: { page: number; items: number }) {
    const skip = page === 1 ? 0 : (page - 1) * items
    console.log(searchStr)
    console.log(page, items)
    const where = {
      OR: [
        {
          title: {
            contains: searchStr,
          },
        },
        {
          vendorCode: {
            contains: searchStr,
          },
        },
      ],
    }
    const details = await prisma.detail.findMany({
      skip,
      take: items,
      where,
    })
    const totalCount = await prisma.detail.count({
      where: where,
    })
    console.log(details)

    return { details, totalCount }
  }
}
