import { Injectable } from '@nestjs/common';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma';
import { ITokenPayload } from './types';
import { AppConfigService } from '../app-config';
import { Algorithm } from 'jsonwebtoken';

@Injectable()
export class TokensService {
  private readonly accessTokenSignOptions: JwtSignOptions;
  private readonly refreshTokenSignOptions: JwtSignOptions;

  constructor(
    private readonly config: AppConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    this.accessTokenSignOptions = {
      algorithm: this.config.getEnv('JWT_ALGORITHM') as Algorithm,
      secret: this.config.getEnv('JWT_ACCESS_SECRET'),
      expiresIn: this.config.getEnv('JWT_ACCESS_EXPIRES_IN'),
    };
    this.refreshTokenSignOptions = {
      algorithm: this.config.getEnv('JWT_ALGORITHM') as Algorithm,
      secret: this.config.getEnv('JWT_REFRESH_SECRET'),
      expiresIn: this.config.getEnv('JWT_REFRESH_EXPIRES_IN'),
    };
  }

  async sign(payload: ITokenPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload, this.accessTokenSignOptions),
      refreshToken: await this.jwtService.signAsync(payload, this.refreshTokenSignOptions),
    };
  }

  async create(value: string, userId: string) {
    return this.prisma.token.create({ data: { value, user: { connect: { id: userId } } } });
  }

  async update(value: string, userId: string) {
    return this.prisma.token.update({ where: { userId }, data: { value } });
  }

  async delete(userId: string) {
    return this.prisma.token.delete({ where: { userId } });
  }
}
