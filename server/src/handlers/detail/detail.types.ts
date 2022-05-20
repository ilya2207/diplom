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

export interface IFilterCondition {
  categories?: {
    some: {
      id: number
    }
  }
  models?: {
    some: {
      id: number
    }
  }
}

export interface IShowDetails {
  details: IDetail[]
  totalCount: number
}

export interface IDetailSortParams {
  modelId?: string
  categoryId: string
  page?: string | number
  items?: string | number
  orderBy?: 'asc' | 'desc'
}
