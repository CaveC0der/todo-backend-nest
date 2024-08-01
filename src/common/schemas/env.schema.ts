import { z } from 'zod';

export const EnvSchema = z.object({
  ORIGIN: z.string(),

  PORT: z.coerce.number(),

  PASSWORD_SALT: z.coerce.number(),
  TOKEN_SALT: z.coerce.number(),

  JWT_ALGORITHM: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_ACCESS_EXPIRES_IN: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),

  COOKIE_NAME: z.string(),
  COOKIE_MAX_AGE: z.coerce.number(),

  SERVE_STATIC_FOLDER: z.string(),
  SERVE_STATIC_PREFIX: z.string(),
});

export type TEnvSchema = z.infer<typeof EnvSchema>;
