import { JwtPayload } from 'jsonwebtoken'

export interface TokenData extends JwtPayload {
  id: number
}
