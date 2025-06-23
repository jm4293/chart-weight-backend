import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalConfigModule } from './config/module';

@Module({
  imports: [GlobalConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
