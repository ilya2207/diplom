interface ICategory {
  title: string
  parentCategoryId?: number | null
  childCategories?: ICategoryItem[]
}

export interface ICategoryItem extends ICategory {
  id: number
}

export interface ICategoryItemAdd extends ICategory {
  id?: number
}
export interface IUpdateCategoryItem {
  body: ICategoryItem
  id: number | string
}
