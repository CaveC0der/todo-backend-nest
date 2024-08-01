import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TEnvSchema } from '../common/schemas';
import { join, normalize } from 'path';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  getEnv<K extends keyof TEnvSchema>(key: K): TEnvSchema[K] {
    return this.config.get(key)!;
  }

  get serveStaticPath() {
    return normalize(join(__dirname, '..', '..', this.getEnv('SERVE_STATIC_FOLDER')));
  }
}
