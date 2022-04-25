import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import prisma from '../../prisma'
import ImageService from '../image/image.service'
import ModelService from './model.service'
import { IModel } from './model.types'

export default class ModelController {
  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const modelId: string | undefined = req.params.modelId
      const models = await ModelService.show(+modelId)

      return res.json(models)
    } catch (error) {
      next(error)
    }
  }
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const body: IModel = req.body
      const file: UploadedFile | undefined = req.files?.img as UploadedFile

      if (file) {
        const newImgPath = await ImageService.upload('model', file)
        body.img = newImgPath
      }

      const newModel = await ModelService.add(body)
      return res.json(newModel)
    } catch (error) {
      next(error)
    }
  }
  static async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const modelId: string = req.params.modelId
      const body: IModel = req.body
      const file = req.files?.img as UploadedFile

      if (file) {
        const modelFromDb = await prisma.carModel.findUnique({
          where: {
            id: +modelId,
          },
          select: {
            img: true,
          },
        })

        if (modelFromDb.img === process.env.MODEL_DEFAULT_IMAGE || !modelFromDb.img) {
          const imgPath = await ImageService.upload('model', file)
          body.img = imgPath
        } else {
          await ImageService.update(modelFromDb.img, file)
        }
      }

      const newModel = await ModelService.edit(+modelId, body)
      return res.json(newModel)
    } catch (error) {
      next(error)
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const modelId: string = req.params.modelId

      const deletedModel = await ModelService.delete(+modelId)
      await ImageService.delete(deletedModel.img)

      return res.json({ message: 'Успешно удалено' })
    } catch (error) {
      next(error)
    }
  }
}
