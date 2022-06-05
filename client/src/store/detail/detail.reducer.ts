import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDetail } from 'types/detail.types'
import { fetchDetails, fetchNewDetails, fetchPopularDetails, searchDetail } from './detail.action'

interface IInitState {
  items: IDetail[]
  popularItems: IDetail[]
  newItems: IDetail[]
  error: string | null
  loading: boolean
  currentPage: number
  totalCount: number
  itemsToDisplay: number
  modelId: number | null
  categoryId: number | null
}

const initState: IInitState = {
  popularItems: [],
  newItems: [],
  items: [],
  totalCount: -1,
  categoryId: null,
  modelId: null,
  error: null,
  loading: false,
  currentPage: 1,
  itemsToDisplay: 15,
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
    builder.addCase(fetchNewDetails.fulfilled, (state, action) => {
      state.newItems = action.payload
    })
    builder.addCase(fetchPopularDetails.fulfilled, (state, action) => {
      state.popularItems = action.payload
    })
  },
})

export const { setDetailValues } = detailSlice.actions
