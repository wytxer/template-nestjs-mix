import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import * as AliossClient from 'ali-oss'
import { request } from 'urllib'
import { Duplex } from 'stream'
import { IFileOptions, FileClient } from './file.client'

/**
 * 阿里云文件存储
 * 接口文档：
 * @link https://help.aliyun.com/document_detail/111267.html
 * @link https://help.aliyun.com/document_detail/111265.html
 * 错误排查：
 * @link https://help.aliyun.com/document_detail/185803.htm?spm=a2c4g.11186623.0.0.3bd05161Z4irda#concept-1960170
 */
export class AliyunClient extends FileClient {
  constructor(config: ConfigService) {
    super(config)
    this.client = new AliossClient(config.get('oss.aliyun.config'))
  }
  private logger: Logger = new Logger('[AliyunClient]')
  private client: AliossClient

  // 设置默认的请求头
  private defaultHeaders = {
    // 存储类型
    'x-oss-storage-class': 'Standard',
    // 访问权限
    'x-oss-object-acl': 'private',
    // 是否覆盖同名文件（禁止覆盖同名文件）
    'x-oss-forbid-overwrite': 'true'
  }

  /**
   * 上传文件
   * @param file
   * @returns
   */
  async upload(file: IFileOptions) {
    const config = {
      headers: {
        ...this.defaultHeaders,
        ...file.headers
      }
    }
    // 流上传
    if (Buffer.isBuffer(file.url)) {
      const stream = new Duplex()
      stream.push(file.url, 'base64')
      stream.push(null)
      return this.then(this.client.putStream(file.key, stream, config as AliossClient.PutStreamOptions))
    }
    // 上传网络文件
    if (typeof file.url === 'string' && file.url.match(/^http(s)?:\/\/.+/)) {
      const stream = new Duplex()
      const data = await request(file.url)
      stream.push(data.data)
      stream.push(null)
      return this.then(this.client.putStream(file.key, stream, config as AliossClient.PutStreamOptions))
    }
    // 上传本地文件
    if (typeof file.url === 'string' && file.url.match(/^\/.+/)) {
      return this.then(this.client.put(file.key, file.url, config))
    }
  }

  private async then(promise: Promise<any>) {
    return promise
      .then((res) => {
        // 如果文件上传成功返回文件名称和路径等信息
        if (res.res.statusCode === 200) {
          const { name, url } = res
          return {
            name,
            url
          }
        }
        return res
      })
      .catch((error: Error) => {
        this.logger.error(error)
      })
  }

  /**
   * 文件下载
   * @param key
   * @returns
   */
  download(key: string) {
    return this.client.signatureUrl(key)
  }
}
