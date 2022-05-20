import ApiError from '../../exceptions/api-error'
import prisma from '../../prisma'
import { IDetailSortParams, IFilterCondition } from './detail.types'

export default class DetailService {
  static async show(
    filterCondition: IFilterCondition,
    pagination: { page: number; items: number },
    orderBy?: { price: 'asc' | 'desc' }
  ) {
    const skip = pagination.page === 1 ? 0 : (pagination.page - 1) * pagination.items
    const details = await prisma.detail.findMany({
      skip,
      orderBy,
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

  static generateSortObject(
    queryParams: IDetailSortParams
  ): [IFilterCondition, { page: number; items: number }, { price: 'asc' | 'desc' } | undefined] {
    let filterCondition: IFilterCondition
    const { modelId, categoryId, page = 1, items = 20, orderBy: sortBy } = queryParams
    if (!modelId && !categoryId) throw ApiError.badRequest('Укажите тип поиска')
    if (modelId && categoryId) {
      filterCondition = {
        categories: {
          some: {
            id: +categoryId,
          },
        },
        models: {
          some: {
            id: +modelId,
          },
        },
      }
    } else if (modelId) {
      filterCondition = {
        models: {
          some: {
            id: +modelId,
          },
        },
      }
    } else if (categoryId) {
      filterCondition = {
        categories: {
          some: {
            id: +categoryId,
          },
        },
      }
    }
    const pagination = { page: +page, items: +items }
    const orderBy = sortBy
      ? {
          price: sortBy,
        }
      : undefined
    return [filterCondition, pagination, orderBy]
  }
}
