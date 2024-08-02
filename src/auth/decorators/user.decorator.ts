import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';

type TUser = Express.User;
type TUserKey = keyof Express.User;

export const User = createParamDecorator(
  (data: TUserKey | undefined, ctx: ExecutionContext): TUser | TUser[TUserKey] => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request.user) {
      Logger.error('request.user is undefined', User.name);
      throw new InternalServerErrorException('User credentials are undefined');
    }

    return data ? request.user[data] : request.user;
  },
);
