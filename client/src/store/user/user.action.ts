// @ts-nocheck
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { ILoginInput, ISignupUser, IUser } from 'types/user.types'
import axiosApi from 'utils/api'

export const fetchUserData = createAsyncThunk<
  IUser,
  void,
  {
    rejectValue: string
  }
>('user', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IUser> = await axiosApi.get('user')
    return response.data
  } catch (error) {
    return rejectWithValue('Ошибка получения данных')
  }
})

export const signupUser = createAsyncThunk(
  'user/signup',
  async (body: ISignupUser, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IUser> = await axiosApi.post('user/signup', body)
      localStorage.setItem('token', response.data.accessToken)

      return response.data as IUser
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message as string)
      }
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async (body: ILoginInput, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IUser> = await axiosApi.post('user/login', body)
      localStorage.setItem('token', response.data.accessToken)
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message)
      }
    }
  }
)

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    await axiosApi.post('user/logout')
    localStorage.removeItem('token')
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

export const editProfile = createAsyncThunk('user/edit', async (data: any, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('user/edit', data)
    return response
  } catch (error) {
    return rejectWithValue(error.response)
  }
})
