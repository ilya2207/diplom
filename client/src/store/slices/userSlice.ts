import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from 'types/user.types'

const initState: IUser = {
  email: '',
  firstname: '',
  lastname: '',
  phone: '',
  secondname: '',
  type: 'user',
  accessToken: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    setUser: (_state, action: PayloadAction<IUser>) => {
      return action.payload
    },
  },
})
