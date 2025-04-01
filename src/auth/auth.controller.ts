import { Body, Controller, Post, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('')
  async test() {
    console.log('여긴와야지');
  }

  // @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(
    @Body() signInDto: Record<string, string>,
    @Res() res: Response,
  ) {
    const { access_token, refresh_token, loginUserDto } =
      await this.authService.signIn(signInDto.id, signInDto.password);
    res.setHeader('Authorization', 'Bearer' + access_token);
    return res.json({ access_token, refresh_token, loginUserDto });
  }

  // 리프레시 토큰으로 새로운 액세스 토큰 발급
  @Post('/refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;

    // 리프레시 토큰 검증 및 액세스 토큰 갱신
    const { access_token, refresh_token } =
      await this.authService.refreshAccessToken(refreshToken);
    return { newAccessToken: access_token, newRefreshToken: refresh_token };
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: any) {
  //   return req.user;
  // }
}
