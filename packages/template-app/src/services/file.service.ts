import { fileHelper, FileClient, IFileOptions } from 'helpers'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class FileService {
  constructor(private readonly config: ConfigService) {
    this.init()
  }

  private client: FileClient

  async init() {
    this.client = fileHelper(this.config)
  }

  // 文件上传
  async upload(options: IFileOptions) {
    return await this.client.upload(options)
  }

  // 文件下载
  download(key: string) {
    return this.client.download(key)
  }
}
