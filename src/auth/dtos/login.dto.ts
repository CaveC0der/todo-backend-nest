import { Prisma } from '@prisma/client';
import { IsEmail, IsString, Length } from 'class-validator';

export default class LoginDto implements Omit<Prisma.UserCreateInput, 'username'> {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 64)
  password: string;
}
