import { IUser } from './user.types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserDTO from './user.dto'
import prisma from '../../prisma'
import ApiError from '../../exceptions/api-error'
import { JWT_ACCESS_REFRESH, JWT_ACCESS_SECRET } from '../../constants'

export default class UserService {
  static async signup(data: IUser) {
    const { phone, email, password, firstname, lastname, secondname } = data

    const isUserExists = await prisma.user.findFirst({
      where: {
        OR: [{ phone }, { email }],
      },
    })

    if (isUserExists) throw ApiError.badRequest(`Пользователь с такими данными уже существует`)

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
    const tokens = await this.generateTokens(user.id)

    const userDto = new UserDTO(user)
    return { ...userDto, ...tokens }
  }
  static async generateTokens(
    payload: number
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = jwt.sign({ payload }, JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    })
    const refreshToken = jwt.sign({ payload }, JWT_ACCESS_REFRESH, { expiresIn: '30d' })
    await prisma.user.update({
      where: {
        id: payload,
      },
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    })
    return { accessToken, refreshToken }
  }

  static async login(phone: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
    })
    if (!user) throw ApiError.badRequest('Пользователь не найден')
    const isPasswordEquals = await bcrypt.compare(password, user.password)
    if (!isPasswordEquals) {
      throw ApiError.badRequest('Пароль неверный')
    }
    const tokens = await this.generateTokens(user.id)
    console.log(tokens)

    const userDto = new UserDTO(user)
    return { ...userDto, ...tokens }
  }

  static async logout(userId: number) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        accessToken: null,
        refreshToken: null,
      },
    })
    return true
  }
}
