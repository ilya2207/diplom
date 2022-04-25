export interface IDetail {
  categoryId?: number
  title: string
  shortDescription: string
  modelId?: never
  options?: string
  price: number
  star: number
  img?: Blob | undefined
  imgId?: number
  vendorCode: string
}

export type showByKey = 'modelId' | 'categoryId'
