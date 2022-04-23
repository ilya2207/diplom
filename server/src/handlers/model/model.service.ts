import prisma from '../../prisma'
import { IModel } from './model.types'

export default class ModelService {
  static async show() {
    const models = await prisma.carModel.findMany({
      where: {
        brandId: null,
      },
      include: {
        brandModels: true,
      },
    })
    return models
  }
  static async add(data: IModel) {
    const newModel = await prisma.carModel.create({
      data: data,
    })
    return newModel
  }

  static async edit(id: number, data: IModel) {
    const newModel = await prisma.carModel.update({
      where: {
        id,
      },
      data: data,
    })
    return newModel
  }

  static async delete(id: number) {
    const deletedModel = await prisma.carModel.delete({
      where: {
        id,
      },
    })
  }
}
