import { ClassConstructor, plainToInstance } from 'class-transformer';
import { isBooleanString } from 'class-validator';
import { ParseFilePipeBuilder } from '@nestjs/common';
import { JwtFromRequestFunction } from 'passport-jwt';
import { Request } from 'express';

export const instance = <T, V>(cls: ClassConstructor<T>, plain: V) =>
  plainToInstance(cls, plain, { excludeExtraneousValues: true });

export const ExtractJwtFromCookie =
  (cookie_name: string): JwtFromRequestFunction<Request> =>
  (req: Request): string | null =>
    req.cookies[cookie_name] || null;

export const stringToBoolean = (value: unknown) => {
  if (isBooleanString(value)) {
    return /^true|1$/i.test(value as string);
  }
  return false;
};

export const getParseFilePipe = (fileType: string | RegExp, maxSize: number) =>
  new ParseFilePipeBuilder()
    .addFileTypeValidator({ fileType })
    .addMaxSizeValidator({ maxSize })
    .build();