import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAccessStrategy, JwtRefreshStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users';
import { TokensModule } from 'src/tokens';

@Module({
  imports: [UsersModule, TokensModule],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
