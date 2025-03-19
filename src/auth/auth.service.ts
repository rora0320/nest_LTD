import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //passport-jwt전략 아이디 비밀번호 받으면 토큰
  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //로그인으로 토큰 발급
  async signIn(id: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(id);

    //!!TODO bycrpt
    if (!user) {
      throw new NotFoundException(`존재하지 않는 아이디입니다.`);
    }
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.userName };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

}
