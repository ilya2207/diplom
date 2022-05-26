export interface IModel {
  id: number
  title: string
  model?: string
  brandId?: number | null
  releaseDate?: string
  img?: string
  brandModels?: IModel[]
}
