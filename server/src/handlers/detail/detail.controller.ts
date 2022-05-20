import { Detail } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import prisma from '../../prisma'
import ImageService from '../image/image.service'
import DetailService from './detail.service'
import { IDetail, IDetailSortParams } from './detail.types'

export default class DetailController {
  static async show(
    req: Request<any, any, any, IDetailSortParams>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const [filterCondition, pagination, orderBy] = DetailService.generateSortObject(req.query)
      const responseItems = await DetailService.show(filterCondition, pagination, orderBy)
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
        const detailFromDb = await prisma.detail.findUnique({
          where: {
            id: +detailId,
          },
          select: {
            img: true,
          },
        })

        const imgPath = await ImageService.update('detail', file, detailFromDb.img)
        body.img = imgPath
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
  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { searchStr, page = 1, items = 20 } = req.query
      const pagination = { page: +page, items: +items }
      const details = await DetailService.searchDetail(searchStr.toString(), pagination)
      return res.json(details)
    } catch (error) {
      next(error)
    }
  }
}
