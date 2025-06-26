import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './module/patient';
import { AuthModule } from './module/auth';
import { GlobalConfigModule } from './common/config';

@Module({
  imports: [GlobalConfigModule, PatientModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
