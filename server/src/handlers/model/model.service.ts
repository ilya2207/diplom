import prisma from '../../prisma'
import { IModel } from './model.types'

export default class ModelService {
  static async show(modelId: number | undefined) {
    let models
    if (modelId) {
      models = await prisma.carModel.findMany({
        where: {
          id: +modelId,
        },
        select: {
          id: true,
          title: true,
          brandModels: {
            select: {
              id: true,
              title: true,
              model: true,
              brandId: true,
              img: true,
              releaseDate: true,
            },
          },
        },
      })
    } else {
      models = await prisma.carModel.findMany({
        where: {
          brandId: null,
        },
        select: {
          id: true,
          title: true,
          brandModels: {
            select: {
              id: true,
              title: true,
              model: true,
              brandId: true,
              img: true,
              releaseDate: true,
            },
          },
        },
        orderBy: {
          title: 'asc',
        },
      })
    }

    return models
  }
  static async add(data: IModel) {
    const newData = { ...data, brandId: typeof data.brandId === 'string' ? +data.brandId : null }
    const newModel = await prisma.carModel.create({
      data: { img: process.env.MODEL_DEFAULT_IMAGE, ...newData },
    })
    return newModel
  }

  static async edit(id: number, data: IModel) {
    const newData = {
      ...data,
      brandId: typeof data.brandId === 'string' ? +data.brandId : undefined,
    }

    const newModel = await prisma.carModel.update({
      where: {
        id: +id,
      },
      data: newData,
    })
    return newModel
  }

  static async delete(id: number) {
    const deletedModel = await prisma.carModel.delete({
      where: {
        id,
      },
      select: {
        img: true,
      },
    })
    return deletedModel
  }

  static async search(searchStr: string) {
    const items = await prisma.carModel.findMany({
      where: {
        NOT: {
          brandId: null,
        },
        OR: [
          {
            title: {
              contains: searchStr,
              mode: 'insensitive',
            },
          },
          {
            model: {
              contains: searchStr,
              mode: 'insensitive',
            },
          },
        ],
      },
    })
    return items
  }
}
