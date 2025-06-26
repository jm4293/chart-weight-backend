import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
      },
    });
  }
}
