import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import * as qiniu from 'qiniu'
import { FileClient } from './file.client'

export class QiniuClient extends FileClient {
  constructor(config: ConfigService) {
    super(config)
    const accessKey = config.get('oss.qiniu.config.accessKey')
    const secretKey = config.get('oss.qiniu.config.secretKey')
    qiniu.conf.ACCESS_KEY = accessKey
    qiniu.conf.SECRET_KEY = secretKey
    const qiniuConfig: Record<string, any> = new qiniu.conf.Config()
    /**
     * 空间对应的机房
     * 华东：qiniu.zone.Zone_z0
     * 华北：qiniu.zone.Zone_z1
     * 华南：qiniu.zone.Zone_z2
     * 北美：qiniu.zone.Zone_na0
     */
    qiniuConfig.zone = qiniu.zone.Zone_z2
    // 开启 CDN 上传加速
    qiniuConfig.useCdnDomain = true
    this.config = config
    // 公共配置
    this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    // 上传管理器
    this.bucketManager = new qiniu.rs.BucketManager(this.mac, config)
  }

  private logger = new Logger(QiniuClient.name)
  private mac: qiniu.auth.digest.Mac
  private bucketManager: qiniu.rs.BucketManager

  /**
   * 生成文件上传凭证
   * @returns
   */
  createToken(): string {
    return new qiniu.rs.PutPolicy({
      scope: this.config.get('oss.qiniu.config.scope')
    }).uploadToken(this.mac)
  }

  /**
   * 文件流模式上传
   * @param key
   * @param stream
   * @returns
   */
  async stream(key: string, stream: NodeJS.ReadableStream): Promise<any> {
    const formUploader = new qiniu.form_up.FormUploader(this.config)
    const putExtra = new qiniu.form_up.PutExtra()

    return new Promise((resolve, reject) => {
      formUploader.putStream(this.createToken(), key, stream, putExtra, (error, body, res) => {
        if (error) {
          return reject(error)
        }
        if (+res.statusCode === 200) {
          resolve({ code: 0, body })
        } else {
          this.logger.log(JSON.stringify(body))
          this.logger.log(JSON.stringify(res))
          reject(new Error(res))
        }
      })
    })
  }

  /**
   * 表单模式上传
   * @param key
   * @param file
   * @returns
   */
  async multipart(key: string, file: string): Promise<any> {
    const formUploader = new qiniu.form_up.FormUploader(this.config)
    const putExtra = new qiniu.form_up.PutExtra()
    return new Promise((resolve, reject) => {
      formUploader.putFile(this.createToken(), key, file, putExtra, (error, body, res) => {
        if (error) {
          reject(error)
        }
        if (+res.statusCode === 200) {
          resolve({ code: 0, body })
        } else {
          this.logger.log(JSON.stringify(body))
          this.logger.log(JSON.stringify(res))
          reject(new Error(res))
        }
      })
    })
  }

  /**
   * 文件删除
   * @param key
   * @returns
   */
  async delete(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.bucketManager.delete(this.config.get('oss.qiniu.config.scope'), key, (error, body, res) => {
        if (error) {
          reject(error)
        }
        if (+res.statusCode === 200) {
          resolve({ code: 0, body })
        } else {
          this.logger.log('删除七牛空间资源失败')
          this.logger.log(JSON.stringify(body))
          this.logger.log(JSON.stringify(res))
          const code = res.statusCode
          // 如果是返回 612，说明没有找到该文件或者说该文件已经被删除了
          if (code === 612) {
            resolve({ code: 0 })
          } else {
            reject(new Error(res))
          }
        }
      })
    })
  }
}
