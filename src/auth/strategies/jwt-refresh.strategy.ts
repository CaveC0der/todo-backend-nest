import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { ITokenPayload } from 'src/tokens/types';
import { AppConfigService } from '../../app-config';
import { ExtractJwtFromCookie } from '../../common/utils';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  private readonly cookieName;

  constructor(private readonly config: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwtFromCookie(config.getEnv('COOKIE_NAME')),
      secretOrKey: config.getEnv('JWT_REFRESH_SECRET'),
      algorithms: [config.getEnv('JWT_ALGORITHM')],
      passReqToCallback: true,
    });

    this.cookieName = this.config.getEnv('COOKIE_NAME');
  }

  validate(req: Request, payload: ITokenPayload) {
    return { ...payload, refreshToken: ExtractJwtFromCookie(this.cookieName)(req) };
  }
}
