import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

type TUser = Express.User;
type TUserKey = keyof Express.User;

export const User = createParamDecorator(
  (data: TUserKey | undefined, ctx: ExecutionContext): TUser | TUser[TUserKey] => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request.user) {
      throw new InternalServerErrorException();
    }

    return data ? request.user[data] : request.user;
  },
);
