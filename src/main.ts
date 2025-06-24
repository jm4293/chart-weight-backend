import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(
    session({
      secret: 'your-secret-key', // 환경변수로 관리 권장
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 1000, // 1시간
        // httpOnly: true, // JS에서 접근 불가, XSS 방지
        // secure: process.env.NODE_ENV === 'production', // 배포 환경에서만 HTTPS
        sameSite: 'lax', // CSRF 방지
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
