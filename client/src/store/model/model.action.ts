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

export const addModel = createAsyncThunk('model/add', async (body: IModel, { rejectWithValue }) => {
  try {
    const res: AxiosResponse<IModel[]> = await axiosApi.post('model', body)
    return res.data
  } catch (error) {
    rejectWithValue('Что-то пошло не так')
  }
})

interface IEditModelArgument {
  body: IModel
  id: number
}

export const editModel = createAsyncThunk(
  'model/edit',
  async (arg: IEditModelArgument, { rejectWithValue }) => {
    try {
      const { id, body } = arg
      const res: AxiosResponse<IModel[]> = await axiosApi.put(`model/${id}`, body)

      return res.data
    } catch (error) {
      rejectWithValue('Что-то пошло не так')
    }
  }
)

export const deleteModel = createAsyncThunk(
  'model/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      const res: AxiosResponse<IModel[]> = await axiosApi.delete(`model/${id}`)

      return res.data
    } catch (error) {
      rejectWithValue('Что-то пошло не так')
    }
  }
)
