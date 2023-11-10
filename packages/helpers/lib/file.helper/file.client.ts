/* eslint-disable @typescript-eslint/no-unused-vars */

import { ConfigService } from '@nestjs/config'

export interface IFileOptions {
  key: string
  url: string | Buffer
  headers?: Record<string, any>
}

export abstract class OssClient {
  abstract putStreamNetwork(options: IFileOptions): Promise<any>
  abstract putBuffer(options: IFileOptions): Promise<any>
  abstract upload(options: IFileOptions): Promise<any>
  abstract download(key: string): string
  abstract createToken(): string
  abstract stream(key: string, stream: NodeJS.ReadableStream): Promise<any>
  abstract multipart(key: string, file: string): Promise<any>
  abstract delete(key: string): Promise<any>
}

export class FileClient implements OssClient {
  protected config: ConfigService

  constructor(config: ConfigService) {
    this.config = config
  }

  putStreamNetwork(options: IFileOptions): Promise<any> {
    throw new Error('方法未实现')
  }

  putBuffer(options: IFileOptions): Promise<any> {
    throw new Error('方法未实现')
  }

  upload(options: IFileOptions): Promise<any> {
    throw new Error('方法未实现')
  }

  download(key: string): string {
    throw new Error('方法未实现')
  }

  createToken(): string {
    throw new Error('方法未实现')
  }

  stream(key: string, stream: NodeJS.ReadableStream): Promise<any> {
    throw new Error('方法未实现')
  }

  multipart(key: string, file: string): Promise<any> {
    throw new Error('方法未实现')
  }

  delete(key: string): Promise<any> {
    throw new Error('方法未实现')
  }
}
