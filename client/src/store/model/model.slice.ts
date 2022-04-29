import { createSlice } from '@reduxjs/toolkit'
import { IModel } from 'types/model.types'
import { fetchModel } from './model.action'

export interface IModelInitState {
  items: IModel[]
  error: string
  loading: boolean
}

const initState: IModelInitState = {
  items: [],
  error: '',
  loading: false,
}

export const modelSlice = createSlice({
  name: 'model',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchModel.fulfilled, (state, action) => {
      if (action.payload) state.items = action.payload
    })
  },
})
