export interface IDetail {
  categoryId?: number
  title: string
  shortDescription: string
  modelId?: never
  options?: string
  price: number
  star: number
  img?: string
  vendorCode: string
}

export type showByKey = 'modelId' | 'categoryId'
