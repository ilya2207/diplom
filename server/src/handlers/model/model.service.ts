import prisma from '../../prisma'
import { IModel } from './model.types'

export default class ModelService {
  static async show(modelId: string | undefined) {
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
            },
          },
        },
        // include: {
        //   brandModels: true,
        // },
      })
    } else {
      models = await prisma.carModel.findMany({
        where: {
          brandId: null,
        },
        select: {
          id: true,
          title: true,
        },
      })
    }

    return models
  }
  static async add(data: IModel) {
    const newData = { ...data, brandId: typeof data.brandId === 'string' ? +data.brandId : null }
    const newModel = await prisma.carModel.create({
      data: newData,
    })
    return newModel
  }

  static async edit(id: string, data: IModel) {
    const newData = { ...data, brandId: typeof data.brandId === 'string' ? +data.brandId : null }

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
    })
    return deletedModel
  }
}
