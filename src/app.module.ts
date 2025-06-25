import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './module/patient';
import { GlobalConfigModule } from './config/module';
import { AuthModule, SessionSerializer } from './module/auth';

@Module({
  imports: [GlobalConfigModule, PatientModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, SessionSerializer],
})
export class AppModule {}
