import { IUser } from './user.types'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserDTO from './user.dto'
import prisma from '../../prisma'
import ApiError from '../../exceptions/api-error'
import { JWT_ACCESS_REFRESH, JWT_ACCESS_SECRET } from '../../constants'
import { TokenData } from '../../types/types'

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
      expiresIn: '30s',
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

  static async refreshTokens(refreshToken: string) {
    try {
      if (!refreshToken) throw ApiError.unauthError()
      const userData = jwt.verify(refreshToken, JWT_ACCESS_REFRESH) as JwtPayload

      if (!userData) throw ApiError.unauthError()
      const refreshTokenFromDB = await prisma.user.findUnique({
        where: {
          id: userData.payload,
        },
        select: {
          refreshToken: true,
        },
      })
      if (refreshToken !== refreshTokenFromDB.refreshToken) throw ApiError.unauthError()

      const newTokens = await this.generateTokens(userData.payload)
      return newTokens
    } catch (error) {
      throw ApiError.unauthError()
    }
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

  static async editUser(userId: number, body) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...body,
      },
    })

    return user
  }
}
