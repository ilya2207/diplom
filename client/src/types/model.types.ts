export interface IModel {
  id: number
  title: string
  model?: string
  brandId?: number | null
  img?: string
  brandModels?: IModel[]
}
