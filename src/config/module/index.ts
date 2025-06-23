import { ConfigModule } from '@nestjs/config';

export const GlobalConfigModule = ConfigModule.forRoot({
  isGlobal: true,
});
