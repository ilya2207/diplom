import { ICategoryItem } from 'types/category.types'

export const checkNestedArr = (checkedId: number, arr: ICategoryItem[]) => {
  let findedIndex = -1
  for (let index = 0; index < arr.length; index++) {
    const { id } = arr[index]
    if (id === checkedId) {
      findedIndex = id
      break
    }
  }
  return findedIndex
}
