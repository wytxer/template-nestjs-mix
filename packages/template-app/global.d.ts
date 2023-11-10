import { UserInfoVo } from '@vos/user.vo'

declare global {
  namespace Express {
    interface Request {
      user: UserInfoVo
    }
    interface headers extends Request['headers'] {
      scene: string
      platform: string
      product: string
    }
  }
}
