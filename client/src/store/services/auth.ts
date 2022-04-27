import authBaseQuery from 'utils/authBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { ILoginInput, ISignupUser, IUser } from 'types/user.types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getUser: builder.query<IUser, any>({
      query: () => `user`,
    }),
    signup: builder.mutation<IUser, ISignupUser>({
      query: (body) => ({
        body,
        url: '/user/signup',
        method: 'POST',
      }),
    }),
    login: builder.mutation<IUser, ILoginInput>({
      query: (body) => ({
        body,
        url: 'user/login',
        method: 'post',
      }),
    }),
  }),
})

export const { useGetUserQuery, useSignupMutation, useLoginMutation } = authApi
