// @ts-nocheck
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from 'types/user.types'
import { fetchUserData, loginUser, logout, signupUser } from './user.action'

interface InitState {
  loading: boolean
  error: string
  isAuth: boolean
  user: IUser
}

const initState: InitState = {
  error: '',
  loading: false,
  isAuth: false,
  user: {
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    secondname: '',
    type: 'user',
    accessToken: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<IUser>) => {
      const accessToken = state.user.accessToken ?? ''
      state.loading = false
      state.error = ''
      state.isAuth = true
      state.user = action.payload
      state.user.accessToken = accessToken
    })
    builder.addCase(fetchUserData.rejected, (state, action) => {
      if (action?.payload) state.error = action.error
      state.loading = false
      state.isAuth = false
    })
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false
      state.error = ''
      state.isAuth = true
      if (action.payload) state.user = action.payload
    })
    builder.addCase(signupUser.rejected, (state, action) => {
      if (action?.payload) state.error = action.payload
      state.isAuth = false
      state.loading = false
    })
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.error = ''
      state.isAuth = true
      if (action.payload) state.user = action.payload
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload
      state.isAuth = false
      state.loading = false
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false
      state.user = {
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        secondname: '',
        type: 'user',
        accessToken: '',
      }
    })
  },
})
