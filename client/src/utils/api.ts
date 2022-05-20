// import axios, { AxiosError } from 'axios'

// const axiosApi = axios.create({
//   baseURL: 'api',
// })

// let isRefresh = false

// axiosApi.interceptors.request.use((config) => {
//   if (config.headers) {
//     const token = localStorage.getItem('token')
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// axiosApi.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     const originalRequest = error.config
//     // console.log(isRefresh)

//     if (error.response?.status === 401 && error.config && !isRefresh) {
//       isRefresh = false

//       return new Promise(async function (resolve, reject) {
//         try {
//           const res = await axiosApi.post('user/refresh')
//           console.log(res)

//           if (res) {
//             const token = res.data.token
//             localStorage.setItem('token', token)
//           }
//           resolve(axiosApi(error.config))
//         } catch (error) {
//           localStorage.removeItem('token')
//           console.log('1')

//           reject(error)
//         } finally {
//           isRefresh = true
//         }
//       })
//     }
//     throw error
//   }
// )

// export default axiosApi
import axios from 'axios'

const nameToken = 'token'

const SERVER_HOST = '/api'
//  || 'https://ilya2207-diplom.herokuapp.com/'

const axiosApi = axios.create({
  withCredentials: true,
  baseURL: `${SERVER_HOST}`,
})

axiosApi.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(nameToken)}`
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

axiosApi.interceptors.response.use(
  (config) => {
    return config
  },

  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axiosApi.post('user/refresh')

        localStorage.setItem('token', response.data.accessToken)
        return axiosApi.request(originalRequest)
      } catch (e) {
        localStorage.removeItem('token')
      }
    }
    throw error
  }
)

export default axiosApi
