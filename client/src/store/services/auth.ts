import authBaseQuery from 'utils/authBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'
import { ILoginInput, ISignupUser, IUser } from 'types/user.types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: authBaseQuery,
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => ({ url: 'user' }),
      providesTags: [{ type: 'user', id: 'user' }],
    }),
    signup: builder.mutation<IUser, ISignupUser>({
      query: (body) => ({
        body,
        url: 'user/signup',
        method: 'POST',
      }),
    }),
    login: builder.mutation<IUser, ILoginInput>({
      query: (body) => ({
        body,
        url: 'user/login',
        method: 'post',
      }),
      // invalidatesTags: [{ type: 'user', id: 'user' }],
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'user/logout',
        method: 'post',
      }),
      // invalidatesTags: [{ type: 'user', id: 'user' }],
    }),
  }),
})
export const { useGetUserQuery, useSignupMutation, useLoginMutation, useLogoutMutation } = authApi
