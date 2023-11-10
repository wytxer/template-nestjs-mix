import { Injectable } from '@nestjs/common'
import { extname } from 'path'

import { Gender, IConstValue } from 'domains'
import { CommonUploadDto } from '@dtos/common.dto'
import { FileService } from '@services/file.service'
import { createUuid } from '@helpers/util.helper'

@Injectable()
export class CommonService {
  constructor(private readonly fileService: FileService) {}

  private readonly folder = 'file'

  /**
   * 文件上传
   * @param file
   */
  async upload(file: Express.Multer.File, body: CommonUploadDto): Promise<any> {
    const isPrivate = body.private === 'y'
    const { name: fileName, url: filePath } = await this.fileService.upload({
      key: `/${this.folder}/${body.key || createUuid()}${extname(body.originalName || file.originalname)}`,
      url: file.buffer,
      headers: {
        'x-oss-object-acl': isPrivate ? 'private' : 'public-read'
      }
    })
    return {
      fileName,
      filePath: isPrivate ? this.fileService.download(fileName) : filePath
    }
  }

  /**
   * 性别列表
   */
  genders: () => IConstValue[] = Gender.values
}
