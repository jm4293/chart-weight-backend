import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    return user;
  }
}
