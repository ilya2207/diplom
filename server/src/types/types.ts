import { JwtPayload } from 'jsonwebtoken'
import { UserRole } from '../handlers/user/user.types'

export interface TokenData extends JwtPayload {
  id: number
  type: UserRole
}

export type ImageRelativeType = 'model' | 'detail'
