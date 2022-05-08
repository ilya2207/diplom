import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDetail } from 'types/detail.types'
import { fetchDetails } from './detail.action'

interface IInitState {
  items: IDetail[]
  error: string | null
  loading: boolean
}

const initState: IInitState = {
  items: [],
  error: null,
  loading: false,
}

export const detailSlice = createSlice({
  name: 'detail',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchDetails.fulfilled, (state, action) => {
      state.items = action.payload
      state.loading = false
    })
    builder.addCase(fetchDetails.rejected, (state, action) => {
      state.loading = false
      state.error = 'Ошибка'
    })
  },
})
