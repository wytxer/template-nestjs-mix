import { Controller, Post, UseInterceptors, UploadedFile, Body, Get } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { IConstValue } from 'domains'
import { CommonUploadDto } from '@dtos/common.dto'
import { CommonService } from '@services/common.service'

@ApiTags('Common')
@Controller({
  path: 'common',
  version: '1'
})
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @ApiOperation({
    summary: '文件上传'
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body: CommonUploadDto) {
    return await this.commonService.upload(file, body)
  }

  @ApiOperation({
    summary: '获取性别列表'
  })
  @Get('genders')
  genders(): IConstValue[] {
    return this.commonService.genders()
  }
}
