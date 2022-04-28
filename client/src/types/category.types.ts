export interface ICategoryItem {
  id?: number
  title: string
  parentCategoryId?: number
  childCategories?: ICategoryItem[]
}
