import { AdminInfoVo } from '@vos/admin.vo'

declare global {
  namespace Express {
    interface Request {
      admin: AdminInfoVo
    }
    interface headers extends Request['headers'] {
      scene: string
      platform: string
      product: string
    }
  }
}
