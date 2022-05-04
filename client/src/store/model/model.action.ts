import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { IModel } from 'types/model.types'
import axiosApi from 'utils/api'

export const fetchModel = createAsyncThunk('model/fetch', async (_, { rejectWithValue }) => {
  try {
    const res: AxiosResponse<IModel[]> = await axiosApi.get('model')
    return res.data
  } catch (error) {
    rejectWithValue('Что-то пошло не так')
  }
})

export const addModel = createAsyncThunk(
  'model/add',
  async (body: IModel, { rejectWithValue, dispatch }) => {
    try {
      await axiosApi.post('model', body)
      return dispatch(fetchModel())
    } catch (error) {
      rejectWithValue('Что-то пошло не так')
    }
  }
)

interface IEditModelArgument {
  body: IModel
  id: number
}

export const editModel = createAsyncThunk(
  'model/edit',
  async (arg: IEditModelArgument, { rejectWithValue, dispatch }) => {
    try {
      const { id, body } = arg
      await axiosApi.put(`model/${id}`, body).then(() => dispatch(fetchModel()))
      return
    } catch (error) {
      rejectWithValue('Что-то пошло не так')
    }
  }
)

export const deleteModel = createAsyncThunk(
  'model/delete',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      await axiosApi.delete(`model/${id}`)
      return dispatch(fetchModel())
    } catch (error) {
      rejectWithValue('Что-то пошло не так')
    }
  }
)
