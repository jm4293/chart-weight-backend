import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { PrismaModule } from '../prisma';
import { UserService } from '../user/user.service';

@Module({
  imports: [PrismaModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
