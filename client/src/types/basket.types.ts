import { IDetail } from './detail.types'

export interface IBasketItem {
  id?: number
  detailId?: number
  detail?: IDetail
  amount: number
}
export interface IBasket {
  basketItems: IBasketItem[]
}
