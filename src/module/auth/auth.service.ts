import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import * as bcrypt from 'bcrypt';
import { AuthDto } from '../../type/dto/auth';
import { User } from 'src/type/entity/user';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.findUserByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    const { password: _, ...result } = user;

    return result;
  }

  async resetPassword(dto: AuthDto) {
    const { email, password } = dto;

    await this.prisma.findUserByEmail(email);

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return { message: '비밀번호가 성공적으로 재설정되었습니다.' };
  }
}
