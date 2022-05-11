import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { IDetail } from 'types/detail.types'
import axiosApi from 'utils/api'

interface IFetchDetailsArgument {
  categoryId?: string
  modelId?: string
  page?: number | string
  items?: string
}

// await new Promise((resolve, reject) => {
//   setTimeout(async () => {
//     try {
//       const res = await axiosApi.get(
//         `http://localhost:5000/api/detail?${categoryIdStr}&${modelIdStr}`
//       )

//       resolve(res)
//     } catch (error) {
//       reject(error)
//     }
//   }, 3000)
// })
// await axiosApi.get(
//   `http://localhost:5000/api/detail?${categoryIdStr}&${modelIdStr}&${pageStr}`
// )
interface IFetchDetailsResponse {
  details: IDetail[]
  totalCount: number
}

export const fetchDetails = createAsyncThunk(
  'detail/fetch',
  async (params: IFetchDetailsArgument, { rejectWithValue }) => {
    try {
      const { categoryId, modelId, page } = params
      const categoryIdStr = categoryId && `categoryId=${categoryId}`
      const modelIdStr = modelId && `modelId=${modelId}`
      const pageStr = page && `page=${page}`
      const response: AxiosResponse<IFetchDetailsResponse> = await axiosApi.get(
        `http://localhost:5000/api/detail?${categoryIdStr}&${modelIdStr}&${pageStr}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue('Ошибка' as string)
    }
  }
)

export const addDetail = createAsyncThunk('detail/add', (_, { rejectWithValue }) => {
  try {
  } catch (error) {}
})

export const editDetail = createAsyncThunk('detail/edit', (_, { rejectWithValue }) => {
  try {
  } catch (error) {}
})

export const deleteDetail = createAsyncThunk('detail/delete', (_, { rejectWithValue }) => {
  try {
  } catch (error) {}
})

// export const fetchDetails = createAsyncThunk('detail/show', (_, { rejectWithValue }) => {
//   try {
//   } catch (error) {}
// })

// export const aaa = createAsyncThunk('detail/show', (_, { rejectWithValue }) => {
//   try {
//   } catch (error) {}
// })
