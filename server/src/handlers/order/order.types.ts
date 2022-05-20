import { BasketItem } from '@prisma/client'

export interface IBasketItemsToOrder extends Pick<BasketItem, 'amount' | 'detailId'> {
  detail: {
    price: number
  }
}

export type OrderStatusType = 'created' | 'confirmed' | 'rejected'
