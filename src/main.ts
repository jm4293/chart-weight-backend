import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';
import * as fs from 'fs';
import * as path from 'path';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(morgan('combined'));

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://8134293.iptime.org:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(
    session({
      secret: configService.get('SESSION_SECRET') as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // 개발환경에서는 false, 배포시 true(HTTPS)
        maxAge: 1000 * 60 * 60, // 1시간
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 업로드 디렉토리 설정 및 생성
  const uploadDir = path.join(__dirname, '..', 'uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // 업로드 파일 정적 제공
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Swagger 설정 시작
  const config = new DocumentBuilder()
    .setTitle('API 문서')
    .setDescription('API 설명')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none', // 모두 접힘
      defaultModelsExpandDepth: -1, // Models도 접힘
    },
  });
  // Swagger 설정 끝

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
