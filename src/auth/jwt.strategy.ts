import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      // secret key는 외부에 노출되면 안 되는 값이므로 환경변수나 config로 빼서 사용하는 것을 권장한다.
      secretOrKey: 'SECRET_KEY',
    });
  }

  //로그인 처리
  async validate(
    id: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    console.log('로그인 validate User ');
    const user = await this.authService.validateUser(id, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
