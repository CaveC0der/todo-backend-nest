import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EnvSchema } from './common/schemas';
import { AppConfigModule } from './app-config';
import { PrismaModule } from './prisma';
import { FilesModule } from './files';
import { UsersModule } from './users';
import { TokensModule } from './tokens';
import { AuthModule } from './auth';
import { TodoModule } from './todo';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config) => EnvSchema.parse(config),
      cache: true,
    }),
    AppConfigModule,
    PrismaModule,
    FilesModule,
    UsersModule,
    JwtModule,
    TokensModule,
    AuthModule,
    TodoModule,
  ],
})
export class AppModule {}
