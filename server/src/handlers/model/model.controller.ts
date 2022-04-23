import { NextFunction, Request, Response } from 'express'
import ModelService from './model.service'
import { IModel } from './model.types'

export default class ModelController {
  static async show(req: Request, res: Response, next: NextFunction) {
    try {
      const models = await ModelService.show()

      return res.json(models)
    } catch (error) {
      next(error)
    }
  }
  static async add(req: Request, res: Response, next: NextFunction) {
    const body: IModel = req.body
    
    try {
    } catch (error) {
      next(error)
    }
  }
  static async edit(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error)
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error)
    }
  }
}
