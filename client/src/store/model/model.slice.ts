import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    addBrand: (state) => {
      const id = 0 - (Date.now() + Math.random())
      const newBrand = { id, title: '', brandModels: [] }
      state.items.push(newBrand)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchModel.fulfilled, (state, action) => {
      if (action.payload) state.items = action.payload
    })
  },
})

export const { addBrand, setError } = modelSlice.actions
