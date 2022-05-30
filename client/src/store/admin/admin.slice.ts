import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteDetail, detailAdminSearch } from 'store/detail/detail.action'
import { ICategoryItem } from 'types/category.types'
import { IDetail, IDetailWithDetailsAndCategories } from 'types/detail.types'
import { IModel } from 'types/model.types'
import { searchAdminValues } from './admin.action'

interface IInitState {
  models: IModel[]
  categories: ICategoryItem[]
  details: any[]
}

const initState: IInitState = {
  categories: [],
  models: [],
  details: [],
}

export const adminSlice = createSlice({
  name: 'admin',
  reducers: {
    resetValues: (state) => initState,
  },
  initialState: initState,
  extraReducers: (builder) => {
    builder.addCase(
      searchAdminValues.fulfilled,
      (state, action: PayloadAction<[IDetail[] | IModel[], any]>) => {
        const [data, key] = action.payload
        state[key] = data
      }
    )
    builder.addCase(detailAdminSearch.fulfilled, (state, action) => {
      state.details = action.payload
    })
    builder.addCase(deleteDetail.fulfilled, (state, action) => {
      const details = state.details

      for (let i = 0; i < details.length; i++) {
        const detail = details[i]
        if (detail.id === action.payload) {
          details.splice(i, 1)
        }
      }
      console.log(details)
    })
  },
})

export const { resetValues } = adminSlice.actions
