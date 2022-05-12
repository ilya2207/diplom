import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDetail } from 'types/detail.types'
import { fetchDetails, searchDetail } from './detail.action'

interface IInitState {
  items: IDetail[]
  error: string | null
  loading: boolean
  currentPage: number
  totalCount: number
  itemsToDisplay: number
}

const initState: IInitState = {
  items: [],
  totalCount: -1,
  error: null,
  loading: false,
  currentPage: 1,
  itemsToDisplay: 20,
}

export const detailSlice = createSlice({
  name: 'detail',
  initialState: initState,
  reducers: {
    setDetailValues: (state, action: PayloadAction<Partial<IInitState>>) => {
      for (const key in action.payload) {
        state[key] = action.payload[key]
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchDetails.fulfilled, (state, action) => {
      state.items = action.payload.details
      state.totalCount = action.payload.totalCount

      state.loading = false
    })
    builder.addCase(fetchDetails.rejected, (state, action) => {
      state.loading = false
      state.error = 'Ошибка'
    })
    builder.addCase(searchDetail.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(searchDetail.fulfilled, (state, action) => {
      state.items = action.payload.details
      state.totalCount = action.payload.totalCount

      state.loading = false
    })
    builder.addCase(searchDetail.rejected, (state, action) => {
      state.loading = false
      state.error = 'Ошибка'
    })
  },
})

export const { setDetailValues } = detailSlice.actions
