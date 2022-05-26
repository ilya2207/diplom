import { createAsyncThunk } from '@reduxjs/toolkit'
import { IDetail } from 'types/detail.types'
import { IModel } from 'types/model.types'
import axiosApi from 'utils/api'
import { InitStateKeysType } from './admin.slice'

interface ISearchValues {
  type: InitStateKeysType
  searchStr: string
}

export const searchAdminValues = createAsyncThunk(
  'admin/search',
  async (data: ISearchValues, { dispatch }): Promise<[IDetail[] | IModel[], InitStateKeysType]> => {
    const { searchStr, type } = data
    const searchType = type === 'categories' ? 'category' : 'model'
    const response = await axiosApi.get(`${searchType}/admin/search?searchStr=${searchStr}`)
    console.log(response)
    return [response.data, type]
  }
)
