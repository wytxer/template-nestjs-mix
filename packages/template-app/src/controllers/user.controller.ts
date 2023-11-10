import { Controller, Get, Post, Body, Query, UseGuards, Req, Res, UseInterceptors } from '@nestjs/common'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'

import { UserUserIdDto, UserWechatLoginDto, UserWechatGetPhoneDto } from '@dtos/user.dto'
import { UserInfoVo } from '@vos/user.vo'
import { UserService } from '@services/user.service'
import { UserGuard } from '@guards/user.guard'
import { MockInterceptor } from '@interceptors/mock.interceptor'

@ApiTags('User')
@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) {}

  @ApiOperation({
    summary: '模拟登录'
  })
  @Get('mockLogin')
  @UseInterceptors(MockInterceptor)
  async mockLogin(@Query() query: UserUserIdDto, @Res({ passthrough: true }) response: Response): Promise<UserInfoVo> {
    const user = await this.userService.info(query.userId)
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

  @ApiOperation({
    summary: '微信授权登录'
  })
  @Post('wechatLogin')
  async wechatLogin(
    @Body() body: UserWechatLoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<UserInfoVo> {
    const user = await this.userService.wechatLogin(body)
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

  @ApiOperation({ summary: '退出登录' })
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
    summary: '微信授权获取手机号'
  })
  @Post('wechatGetPhone')
  async wechatGetPhone(@Body() body: UserWechatGetPhoneDto): Promise<UserInfoVo> {
    return await this.userService.wechatGetPhone(body)
  }

  @ApiOperation({
    summary: '获取用户信息'
  })
  @Get('info')
  @UseGuards(UserGuard)
  async info(@Req() request: Request): Promise<UserInfoVo> {
    return await this.userService.info(request.user.userId)
  }
}
