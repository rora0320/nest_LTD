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
  async signIn(@Body() signInDto: Record<string, any>, @Res() res: Response) {
    console.log('로그인으로 요청가야지', signInDto);
    const { access_token, refresh_token } = await this.authService.signIn(
      signInDto.id,
      signInDto.password,
    );
    console.log('로그인으로 요청 받아온거', access_token);
    res.setHeader('Authorization', 'Bearer' + access_token);
    return res.json({ access_token, refresh_token });
  }

  // 리프레시 토큰으로 새로운 액세스 토큰 발급
  @Post('/refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    console.log('body', refreshToken);
    // 리프레시 토큰 검증 및 액세스 토큰 갱신
    const { access_token, refresh_token } =
      await this.authService.refreshAccessToken(refreshToken);
    // return { access_token: newAccessToken };
    return { newAccessToken: access_token, newRefreshToken: refresh_token };
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: any) {
  //   return req.user;
  // }
}
