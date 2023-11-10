import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as crypto from 'crypto'

@Injectable()
export class CryptoService {
  constructor(private readonly config: ConfigService) {}

  /**
   * 加密
   * @param data
   * @returns
   */
  encrypt(data: string): string {
    const buffer = Buffer.from(data, 'utf8')
    const encrypted = crypto.publicEncrypt(
      {
        key: this.config.get('crypto.rsa.publicKey'),
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      buffer
    )
    return encrypted.toString('base64')
  }

  /**
   * 解密
   * @param data
   * @returns
   */
  decrypt(data: string): string {
    const buffer = Buffer.from(data, 'base64')
    const privateKey = crypto.createPrivateKey(this.config.get('crypto.rsa.privateKey'))
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      buffer
    )
    return decrypted.toString('utf8')
  }

  /**
   * 密码加盐
   * @param password
   */
  passwordSalt(password: string) {
    const decryptedPassword = this.decrypt(password)
    const salt = crypto.randomBytes(16).toString('hex')
    const hashedPassword = crypto.pbkdf2Sync(decryptedPassword, salt, 1000, 64, 'sha1').toString('hex')
    return `${salt}$${hashedPassword}`
  }

  /**
   * 密码校验
   * @param encryptedPassword
   * @param password
   */
  passwordVerify(encryptedPassword: string, password: string) {
    let decryptedPassword: string
    try {
      decryptedPassword = this.decrypt(encryptedPassword)
    } catch (error) {
      const logger = new Logger('[CryptoService]')
      logger.error(error)
      return false
    }
    const [salt, storedHash] = password.split('$')
    const hashedPassword = crypto.pbkdf2Sync(decryptedPassword, salt, 1000, 64, 'sha1').toString('hex')
    return hashedPassword === storedHash
  }

  /**
   * 加密数据
   * @param data
   */
  encryptAes256(data: string) {
    const { key, iv } = this.config.get('crypto.aes')
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv))
    let text = cipher.update(data, 'utf8', 'hex')
    text += cipher.final('hex')
    return text
  }

  /**
   * 解密数据
   * @param data
   */
  decryptAes256(data: string) {
    const { key, iv } = this.config.get('crypto.aes')
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv))
    let text = decipher.update(data, 'hex', 'utf8')
    text += decipher.final('utf8')
    return text
  }
}
