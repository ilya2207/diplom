export interface IUser {
  id?: number
  firstname: string
  secondname: string
  lastname: string
  password: string
  email: string
  phone: string
  type: UserRole
  accessToken?: string | null
  refreshToken?: string | null
  imgId: number | null
}

export type UserRole = 'Admin' | 'User'
