import { IUser, IUserEdit } from './user.types'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserDTO from './user.dto'
import prisma from '../../prisma'
import ApiError from '../../exceptions/api-error'
import { TokenData } from '../../types/types'
import { Prisma } from '@prisma/client'

export default class UserService {
  static async show(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        firstname: true,
        secondname: true,
        lastname: true,
        email: true,
        phone: true,
        type: true,
      },
    })
    return user
  }
  static async signup(data: IUser) {
    const { phone, email, password, firstname, lastname, secondname } = data

    const isUserExists = await prisma.user.findFirst({
      where: {
        phone,
      },
    })

    if (isUserExists) throw ApiError.badRequest(`Пользователь с таким телефоном уже существует`)

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
    const tokens = await this.generateTokens({ id: user.id, type: user.type })

    const userDto = new UserDTO(user)
    return { ...userDto, ...tokens }
  }
  static async generateTokens(
    payload: TokenData
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '10m',
    })
    const refreshToken = jwt.sign({ payload }, process.env.JWT_ACCESS_REFRESH, { expiresIn: '30d' })
    await prisma.user.update({
      where: {
        id: payload.id,
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
      const userData = jwt.verify(refreshToken, process.env.JWT_ACCESS_REFRESH) as JwtPayload

      if (!userData) throw ApiError.unauthError()
      const refreshTokenFromDB = await prisma.user.findUnique({
        where: {
          id: userData.payload.id,
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
    const tokens = await this.generateTokens({ id: user.id, type: user.type })

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

  static async editUser(userId: number, body: IUserEdit) {
    const { email, firstname, lastname, phone, secondname, oldPassword, password } = body
    let newUser: Prisma.UserUpdateInput = { email, firstname, lastname, phone, secondname }
    if (oldPassword || password) {
      const passFromDb = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          password: true,
        },
      })
      const isPassEquals = await bcrypt.compare(oldPassword, passFromDb.password)
      if (!isPassEquals) throw ApiError.badRequest('Предыдущий пароль неверный')
      const newPassword = await bcrypt.hash(password, 3)
      newUser.password = newPassword
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: newUser,
    })

    return user
  }
}
