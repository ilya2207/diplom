import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'api',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})
const authBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: '/user/refresh', method: 'post' },
      api,
      extraOptions
    )
    if (refreshResult.data) {
      // @ts-expect-error
      localStorage.setItem('token', refreshResult.data.token)
    } else {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
  }
  return result
}

export default authBaseQuery
