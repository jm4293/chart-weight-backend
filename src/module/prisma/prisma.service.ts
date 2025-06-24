import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async findPatientById(id: number) {
    const ret = await this.patient.findUnique({ where: { id } });

    if (!ret) {
      throw new BadRequestException('해당 id의 환자가 존재하지 않습니다.');
    }

    return ret;
  }

  async findUserByEmail(email: string) {
    const ret = await this.user.findUnique({ where: { email } });

    if (!ret) {
      throw new BadRequestException(
        '해당 이메일의 사용자가 존재하지 않습니다.',
      );
    }

    return ret;
  }
}
