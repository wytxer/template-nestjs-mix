import { Controller, Post, Get, Body, UseGuards, UseInterceptors, Req, Res, Query } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Response, Request } from 'express'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { AdminAdminIdDto, AdminLoginDto } from '@dtos/admin.dto'
import { AdminInfoVo } from '@vos/admin.vo'
import { AdminService } from '@services/admin.service'
import { AdminGuard } from '@guards/admin.guard'
import { MockInterceptor } from '@interceptors/mock.interceptor'

@ApiTags('Admin')
@Controller({
  path: 'admin',
  version: '1'
})
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) {}

  @ApiOperation({
    summary: '模拟登录'
  })
  @Get('mockLogin')
  @UseInterceptors(MockInterceptor)
  async mockLogin(
    @Query() query: AdminAdminIdDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AdminInfoVo> {
    const user = await this.adminService.info(query.adminId)
    const token = this.jwt.sign(user)
    const key = this.config.get('cookie.key')
    response.cookie(key, token, {
      httpOnly: true,
      maxAge: this.config.get('cookie.maxAge'),
      sameSite: 'lax'
    })
    response.setHeader(key, token)
    return user
  }

  @ApiOperation({ summary: '管理员密码登录' })
  @Post('login')
  async login(@Body() body: AdminLoginDto, @Res({ passthrough: true }) response: Response): Promise<AdminInfoVo> {
    const admin = await this.adminService.login(body)
    response.cookie(this.config.get('cookie.key'), this.jwt.sign(admin), {
      httpOnly: true,
      maxAge: this.config.get('cookie.maxAge'),
      sameSite: 'lax'
    })
    return admin
  }

  @ApiOperation({ summary: '管理员登出' })
  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(this.config.get('cookie.key'), {
      httpOnly: true,
      maxAge: null,
      sameSite: 'lax'
    })
    return
  }

  @ApiOperation({
    summary: '获取管理员信息',
    description: '已登录时返回管理员信息'
  })
  @Get('info')
  @UseGuards(AdminGuard)
  async info(@Req() request: Request): Promise<AdminInfoVo> {
    return await this.adminService.info(request.admin.adminId)
  }
}
