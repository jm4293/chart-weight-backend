import {
  Controller,
  Post,
  Req,
  UseGuards,
  HttpCode,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from '../../type/dto/auth';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req: Request) {
    return {};
  }

  @Post('logout')
  logout(@Req() req: Request) {
    req.session.destroy(() => {});

    return { message: '로그아웃 성공' };
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: AuthDto) {
    await this.authService.resetPassword(dto);

    return { message: '비밀번호 재설정 요청이 처리되었습니다.' };
  }
}
