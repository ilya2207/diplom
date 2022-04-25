import { Image } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import ImageService from '../image/image.service'
import ModelService from './model.service'
import { IModel } from './model.types'

export default class ModelController {
  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const modelId: string | undefined = req.params.modelId
      const models = await ModelService.show(modelId)

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
        const newImg = await ImageService.upload('model', file)
        body.imgId = newImg.id
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
      const body = req.body
      const file = req.files.img as UploadedFile
      let newImg: Image | undefined
      if (file) {
        const img = await ImageService.findImgId(+modelId, 'model')
        if (img?.id) {
          await ImageService.update(img.id, file)
        } else {
          const newImageFromDb = await ImageService.upload('model', file)
          newImg = newImageFromDb
        }
      }
      if (newImg) {
        body.imgId = newImg.id
      }
      const newModel = await ModelService.edit(modelId, body)
      return res.json(newModel)
    } catch (error) {
      next(error)
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const modelId: string = req.params.modelId

      const deletedModel = await ModelService.delete(+modelId)
      await ImageService.delete(deletedModel.imgId)

      return res.json({ message: 'Успешно удалено' })
    } catch (error) {
      next(error)
    }
  }
}
