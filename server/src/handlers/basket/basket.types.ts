export interface IBasket {
  id?: number
  userId: number
}

export interface IBasketItem {
  id?: number
  basketId?: number
  detailId: number
  amount: number
}
