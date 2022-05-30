import { ICategoryItem } from './category.types'
import { IModel } from './model.types'

export interface IDetail {
  id: number
  img: string
  price: number
  title: string
  vendorCode: string
}

export interface IDetailWithDetailsAndCategories extends IDetail {
  models: IModel[]
  categories: ICategoryItem[]
}
