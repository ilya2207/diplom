import { IDetail } from './detail.types'

export type OrderStatusType = 'confirmed' | 'created' | 'rejected'

export const orderStatusDisplayed = {
  confirmed: 'Оформлен',
  created: 'Создан',
  rejected: 'Отменен',
}

export interface IOrder {
  id: number
  totalPrice: number
  orderNumber: string
  createdAt: string
  status: OrderStatusType
  rejectedReason: number
  orderItems: IOrderItem[]
  userId: number
}

export interface IOrderItem {
  id: number
  amount: number
  orderId: number
  detailId: number
  detail: IDetail
}
