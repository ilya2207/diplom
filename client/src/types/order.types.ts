import { IDetail } from './detail.types'
import { IUser } from './user.types'

export type OrderStatusType = 'confirmed' | 'created' | 'rejected'

export const orderStatusDisplayed = {
  confirmed: 'Оформлен',
  created: 'Создан',
  rejected: 'Отклонен',
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
  user?: Pick<IUser, 'firstname' | 'lastname' | 'phone' | 'secondname'>
}

export interface IOrderItem {
  id: number
  amount: number
  orderId: number
  detailId: number
  detail: IDetail
}
