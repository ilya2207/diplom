import { IUser } from './user.types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserDTO from './user.dto'
import prisma from '../../prisma'

export default class UserService {
  static async signup(data: IUser) {
    const { phone, email, password, firstname, lastname, secondname } = data

    const isUserExists = await prisma.user.findFirst({
      where: {
        phone,
        email,
      },
    })

    if (isUserExists) throw new Error(`Пользователь с такими данными уже существует`)

    const hashPassword = await bcrypt.hash(password, 3)
    const user = await prisma.user.create({
      data: {
        firstname,
        secondname,
        lastname,
        phone,
        email,
        password: hashPassword,
      },
    })
    const tokens = this.generateTokens(user.id)
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    })
    const userDto = new UserDTO(user)
    return { ...userDto, ...tokens }
  }
  static generateTokens(payload): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(
      { payload },
      process.env.JWT_ACCESS_SECRET || 'diplom-ilya2207-secret',
      {
        expiresIn: '30m',
      }
    )
    const refreshToken = jwt.sign(
      { payload },
      process.env.JWT_ACCESS_SECRET || 'diplom-ilya2207-refresh',
      { expiresIn: '30d' }
    )
    return { accessToken, refreshToken }
  }

  static async saveToken(userId, payload: string) {}
}
