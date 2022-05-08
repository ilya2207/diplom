import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { IDetail } from 'types/detail.types'
import axiosApi from 'utils/api'

interface IFetchDetailsArgument {
  categoryId?: string
  modelId?: string
}

export const fetchDetails = createAsyncThunk(
  'detail/fetch',
  async (params: IFetchDetailsArgument, { rejectWithValue }) => {
    try {
      const { categoryId, modelId } = params
      const categoryIdStr = categoryId && `categoryId=${categoryId}`
      const modelIdStr = modelId && `modelId=${modelId}`
      const response: AxiosResponse<IDetail[]> = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const res = await axiosApi.get(
              `http://localhost:5000/api/detail?${categoryIdStr}&${modelIdStr}`
            )

            resolve(res)
          } catch (error) {
            reject(error)
          }
        }, 3000)
      })
      console.log(response)

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
