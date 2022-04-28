export interface IUser {
  firstname: string
  secondname: string
  lastname: string
  type: 'user' | 'admin'
  email: string
  phone: string
  accessToken: string
}

export interface ILoginInput {
  phone: string
  password: string
}

export interface ISignupUser {
  firstname: string
  secondname: string
  lastname: string
  email: string
  phone: string
  password: string
}

export interface ISignupError {
  errors: any[]
  message: string
}
