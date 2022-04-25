import { Detail } from '@prisma/client'
import ApiError from '../../exceptions/api-error'
import prisma from '../../prisma'
import { IDetail, showByKey } from './detail.types'

export default class DetailService {
  static async show(
    type: showByKey | 'both',
    query: number | { modelId: number; categoryId: number }
  ): Promise<Detail[]> {
    let details: Detail[] = []
    if (type === 'categoryId' || type === 'modelId') {
      details = await prisma.detail.findMany({
        where: {
          [type]: query,
        },
        include: {
          img: true,
        },
      })
    }

    if (type === 'both' && typeof query === 'object') {
      details = await prisma.detail.findMany({
        where: {
          ...query,
        },
        include: {
          img: true,
        },
      })
    } else {
      throw ApiError.badRequest('Неправильные поля запроса')
    }
    return details
  }
  static async add(data) {
    const newDetail = await prisma.detail.create({
      data,
    })

    return newDetail
  }
  static async edit(id: string, data) {
    const newModel = await prisma.detail.update({
      where: {
        id: +id,
      },
      data,
    })
    return newModel
  }
  static async delete(id: number) {
    await prisma.detail.delete({
      where: {
        id,
      },
    })
  }
}
