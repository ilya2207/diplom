import { NextFunction, Request, Response } from 'express'
import CategoryService from './category.service'
import { ICategory } from './category.types'

export default class CategoryController {
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const body: ICategory = req.body
      const newCategory = await CategoryService.add(body)
      return res.json(newCategory)
    } catch (error) {
      next(error)
    }
  }
  static async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const body: ICategory = req.body
      const id = req.params.categoryId
      const category = await CategoryService.edit(+id, body)
      return res.json(category)
    } catch (error) {
      next(error)
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.categoryId
      const category = await CategoryService.delete(+id)
      console.log(category)

      return res.json({ message: 'Успешно удалено', id })
    } catch (error) {
      next(error)
    }
  }
  static async show(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.show()
      return res.json(categories)
    } catch (error) {
      next(error)
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const searchStr = req.query.searchStr as string

      const items = await CategoryService.search(searchStr)
      return res.json(items)
    } catch (error) {
      next(error)
    }
  }
}
