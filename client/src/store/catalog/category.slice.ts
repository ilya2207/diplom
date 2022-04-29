import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { checkNestedArr } from 'helpers/arrays'
import { ICategoryItem } from 'types/category.types'
import { addCategoryItem, deleteCategoryItem, fetchCategoryItems } from './category.action'

interface ICategoryInitState {
  items: ICategoryItem[]
  loading: boolean
  error: string
}

const initialState: ICategoryInitState = {
  error: '',
  loading: false,
  items: [],
}

export const categorySlice = createSlice({
  initialState,
  name: 'category',
  reducers: {
    addNewCategory: (state, action: PayloadAction<number | undefined>) => {
      const id = 0 - (Date.now() + Math.random())
      const newCategory: ICategoryItem = { id, title: '' }
      newCategory.childCategories = action.payload ? undefined : []
      if (action.payload) {
        const category = state.items.find((item) => item.id === action.payload)
        category?.childCategories?.push(newCategory)
      } else state.items.push(newCategory)
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    deleteNewCategory: (state, action: PayloadAction<number>) => {
      const deletedItemId = action.payload
      const { items } = state

      for (let index = 0; index < items.length; index++) {
        const { id, childCategories } = items[index]
        if (id === deletedItemId) {
          state.items.splice(index, 1)
          break
        }
        if (childCategories) {
          const findedIndex = checkNestedArr(deletedItemId, childCategories)
          if (findedIndex !== -1) {
            childCategories.splice(findedIndex, 1)
            break
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryItems.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchCategoryItems.rejected, (state, action) => {
      state.loading = false
      if (action.payload) state.error = action.payload
    })
    builder.addCase(fetchCategoryItems.fulfilled, (state, action) => {
      state.items = action.payload
      state.loading = false
    })

    builder.addCase(addCategoryItem.fulfilled, (state, action) => {})
  },
})

export const { addNewCategory, setError, deleteNewCategory } = categorySlice.actions
