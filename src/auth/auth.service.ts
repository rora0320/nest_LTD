import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants, JwtPayload } from './constants';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //passport-jwt전략 아이디 비밀번호 받으면 토큰
  async validateUser(
    id: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(id);

    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }

  //로그인으로 토큰 발급
  async signIn(
    id: string,
    pass: string,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    loginUserDto: Omit<User, 'password'>;
  }> {
    const user = await this.usersService.findOne(id);

    //!!TODO bycrpt
    if (!user) {
      throw new NotFoundException(`존재하지 않는 아이디입니다.`);
    }
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.userName };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...loginUserDto } = user;

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.EXPIRE_ACCESS_TOKEN,
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.EXPIRE_REFRESH_TOKEN,
    });
    return { access_token, refresh_token, loginUserDto };
  }

  async refreshAccessToken(
    token: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      // 리프레시 토큰 검증
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: jwtConstants.secret,
      });

      const access_token = await this.jwtService.signAsync(
        { id: payload.id, username: payload.username },
        {
          expiresIn: process.env.EXPIRE_ACCESS_TOKEN,
        },
      );
      const refresh_token = await this.jwtService.signAsync(
        { id: payload.id, username: payload.username },
        {
          expiresIn: process.env.EXPIRE_REFRESH_TOKEN,
        },
      );
      return { access_token, refresh_token };
    } catch (error: unknown) {
      // error가 Error 인스턴스인지 확인
      if (error instanceof Error) {
        console.log('토큰에러?', error.message);
      } else {
        console.log('알 수 없는 오류 발생');
      }
      throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
    }
  }
}
