import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategoryItem } from 'types/category.types'
import { IDetail } from 'types/detail.types'
import { IModel } from 'types/model.types'
import { searchAdminValues } from './admin.action'

interface IInitState {
  models: IModel[]
  categories: ICategoryItem[]
}

const initState: IInitState = {
  categories: [],
  models: [],
}

export type InitStateKeysType = keyof IInitState

export const adminSlice = createSlice({
  name: 'admin',
  reducers: {
    resetValues: (state) => initState,
  },
  initialState: initState,
  extraReducers: (builder) => {
    builder.addCase(
      searchAdminValues.fulfilled,
      (state, action: PayloadAction<[IDetail[] | IModel[], InitStateKeysType]>) => {
        const [data, key] = action.payload
        state[key] = data
      }
    )
  },
})

export const { resetValues } = adminSlice.actions
