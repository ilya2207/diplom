import { Detail } from '@prisma/client'
import e, { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import ApiError from '../../exceptions/api-error'
import prisma from '../../prisma'
import ImageService from '../image/image.service'
import DetailService from './detail.service'
import { IDetail } from './detail.types'

export default class DetailController {
  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      let responseItems: Detail[] = []
      const { modelId, categoryId, page = 1, items = 20 } = req.query

      const pagination = { page: +page, items: +items }
      if (modelId && categoryId) {
        responseItems = await DetailService.show(
          'both',
          {
            modelId: +modelId,
            categoryId: +categoryId,
          },
          pagination
        )
      } else if (modelId) {
        responseItems = await DetailService.show('modelId', +modelId, pagination)
      } else if (categoryId) {
        responseItems = await DetailService.show('categoryId', +categoryId, pagination)
      } else throw ApiError.badRequest('Укажите тип поиска')

      return res.json(responseItems)
    } catch (error) {
      next(error)
    }
  }

  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const body: IDetail = req.body
      body.price = +body.price
      body.star = +body.star
      body.categoryId = +body.categoryId
      body.options = body.options ?? ''
      const file = req.files?.img as UploadedFile

      if (file) {
        const newImgPath = await ImageService.upload('detail', file)
        body.img = newImgPath
      }
      const newDetail = await DetailService.add(body)
      return res.json(newDetail)
    } catch (error) {
      next(error)
    }
  }
  static async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const detailId: string = req.params.detailId
      const body = req.body
      const file = req.files?.img as UploadedFile
      if (file) {
        const detailFromDb = await prisma.carModel.findUnique({
          where: {
            id: +detailId,
          },
          select: {
            img: true,
          },
        })

        if (detailFromDb.img === process.env.DETAIL_DEFAULT_IMAGE || !detailFromDb.img) {
          const imgPath = await ImageService.upload('model', file)
          body.img = imgPath
        } else {
          await ImageService.update(detailFromDb.img, file)
        }
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
