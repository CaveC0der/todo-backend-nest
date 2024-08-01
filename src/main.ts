import { HttpAdapterHost, NestApplication, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './app-config';
import { PrismaClientExceptionFilter } from './prisma';

async function start() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = app.get(AppConfigService);

  app.enableCors({
    origin: config.getEnv('ORIGIN'),
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalFilters(new PrismaClientExceptionFilter(app.get(HttpAdapterHost).httpAdapter));
  app.useStaticAssets(config.serveStaticPath, { prefix: config.getEnv('SERVE_STATIC_PREFIX') });

  await app.listen(config.getEnv('PORT'));

  Logger.log(`URL: ${await app.getUrl()}`, NestApplication.name);
}

start().then();
