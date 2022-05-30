import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { RootState } from 'store/store'
import { IDetail, IDetailWithDetailsAndCategories } from 'types/detail.types'
import axiosApi from 'utils/api'
import { setDetailValues } from './detail.reducer'

interface IFetchDetailsArgument {
  categoryId?: string
  modelId?: string
  page?: number | string
  items?: string
  orderBy?: 'asc' | 'desc'
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
  async (params: IFetchDetailsArgument, { dispatch, rejectWithValue, getState }) => {
    try {
      const { detail } = getState() as RootState
      const { modelId: modelFromStore, categoryId: categoryFromStore } = detail
      let { categoryId = 0, modelId = 0, page, orderBy } = params

      if (modelFromStore !== +modelId || categoryFromStore !== +categoryId) {
        dispatch(
          setDetailValues({
            categoryId: +categoryId,
            modelId: +modelId,
            currentPage: 1,
          })
        )
      } else {
        dispatch(
          setDetailValues({
            modelId: +modelId,
            categoryId: +categoryId,
          })
        )
      }
      const categoryIdStr = categoryId && `categoryId=${categoryId}`
      const modelIdStr = modelId && `modelId=${modelId}`
      const pageStr = page && `page=${page}`
      const orderByStr = orderBy && `orderBy=${orderBy}`
      const response: AxiosResponse<IFetchDetailsResponse> = await axiosApi.get(
        `detail?${categoryIdStr}&${modelIdStr}&${pageStr}&${orderByStr}`
      )
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue('Ошибка' as string)
    }
  }
)

export const addDetail = createAsyncThunk(
  'detail/add',
  async (data: FormData, { rejectWithValue }) => {
    const response = await axiosApi.post('detail', data)
    console.log(response)
    return response
  }
)

interface IEdit {
  id: number
  data: FormData
}
export const editDetail = createAsyncThunk(
  'detail/edit',
  async ({ id, data }: IEdit, { rejectWithValue }) => {
    const response = await axiosApi.put(`detail/${id}`, data)
    console.log(response)
    return response
  }
)

// export const connectDetail = createAsyncThunk('detail/connect', async (body) => {})

export const deleteDetail = createAsyncThunk('detail/delete', async (itemId: number) => {
  const response = await axiosApi.delete(`detail/${itemId}`)
  console.log(response)
  return itemId
})

export interface searchData {
  searchStr: string
  page?: number
  items?: number
}
export const searchDetail = createAsyncThunk(
  'detail/search',
  async (body: searchData, { dispatch }) => {
    try {
      const { searchStr, items = 20, page = 1 } = body
      dispatch(
        setDetailValues({
          modelId: null,
          categoryId: null,
        })
      )
      const response = await axiosApi.get(
        `detail/search?searchStr=${searchStr}&page=${page}&items=${items}`
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchPopularDetails = createAsyncThunk('detail/popular', async () => {
  const response: AxiosResponse<IDetail[]> = await axiosApi.get('detail/popular')
  return response.data
})

export const fetchNewDetails = createAsyncThunk('detail/new', async () => {
  const response: AxiosResponse<IDetail[]> = await axiosApi.get('detail/new')
  return response.data
})

export const detailAdminSearch = createAsyncThunk('detail/serach', async (searchStr: string) => {
  const response = await axiosApi.get(`detail/search/adminSearch?searchStr=${searchStr}`)
  return response.data
})

interface IDisconnectDetailArg {
  type: 'model' | 'category'
  detailId: number
  typeId: number
}

export const disconnectDetail = createAsyncThunk(
  'detail/relations',
  async ({ type, detailId, typeId }: IDisconnectDetailArg) => {
    const response = await axiosApi.delete(`/detail/disconnect/${type}/${typeId}/${detailId}`)
    return response
  }
)
