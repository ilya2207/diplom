import { Detail, Image } from '@prisma/client'
import e, { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import ApiError from '../../exceptions/api-error'
import ImageService from '../image/image.service'
import DetailService from './detail.service'
import { IDetail } from './detail.types'

export default class DetailController {
  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      let responseItems: Detail[] = []
      const { modelId, categoryId } = req.query
      console.log(req.query)
      if (modelId && categoryId) {
        responseItems = await DetailService.show('both', {
          modelId: +modelId,
          categoryId: +categoryId,
        })
      } else if (modelId) {
        responseItems = await DetailService.show('modelId', +modelId)
      } else if (categoryId) {
        responseItems = await DetailService.show('categoryId', +categoryId)
      } else throw ApiError.badRequest('Укажите тип поиска')

      return res.json(responseItems)
    } catch (error) {
      next(error)
    }
  }

  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const detail: IDetail = req.body
      detail.price = +detail.price
      detail.star = +detail.star
      detail.categoryId = +detail.categoryId
      detail.options = detail.options ?? ''
      const uploadedImg = req.files.img as UploadedFile

      if (uploadedImg) {
        const newImg = await ImageService.upload('detail', uploadedImg)
        detail.imgId = newImg.id
      }
      const newDetail = await DetailService.add(detail)
      return res.json(newDetail)
    } catch (error) {
      next(error)
    }
  }
  static async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const detailId: string = req.params.detailId
      const body = req.body
      const file = req.files.img as UploadedFile
      let newImg: Image | undefined
      if (file) {
        const img = await ImageService.findImgId(+detailId, 'model')
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
      const newModel = await DetailService.edit(detailId, body)
      return res.json(newModel)
    } catch (error) {
      next(error)
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const detailId: string = req.params.detailId

      await DetailService.delete(+detailId)
      return res.json({ message: 'Успешно удалено' })
    } catch (error) {
      next(error)
    }
  }
}
