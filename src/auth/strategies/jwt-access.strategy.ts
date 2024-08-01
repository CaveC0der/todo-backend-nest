import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ITokenPayload } from 'src/tokens/types';
import { AppConfigService } from '../../app-config';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private readonly config: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getEnv('JWT_ACCESS_SECRET'),
      algorithms: [config.getEnv('JWT_ALGORITHM')],
    });
  }

  validate(payload: ITokenPayload) {
    return payload;
  }
}
