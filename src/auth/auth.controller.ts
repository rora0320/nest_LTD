import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Res,
} from '@nestjs/common';
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
    const jwtToken = await this.authService.signIn(
      signInDto.id,
      signInDto.password,
    );
    console.log('로그인으로 요청 받아온거', jwtToken);
    res.setHeader('Authorization', 'Bearer' + jwtToken.access_token);
    return res.json(jwtToken);
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: any) {
  //   return req.user;
  // }
}
