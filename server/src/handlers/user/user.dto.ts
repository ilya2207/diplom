import { IUser, UserRole } from './user.types'

export default class UserDTO {
  firstname: string
  secondname: string
  lastname: string
  email: string
  phone: string
  type: UserRole
  constructor(data: IUser) {
    this.firstname = data.firstname
    this.secondname = data.secondname
    this.lastname = data.lastname
    this.email = data.email
    this.phone = data.phone
    this.type = data.type
  }
}
