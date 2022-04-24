export interface IModel {
  title: string
  brandId?: string | null
  model?: string | null
  imgId?: number | null
}

export interface IModelWithImage extends IModel {
  img?: Blob
}
