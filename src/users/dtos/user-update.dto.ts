import { Prisma } from '@prisma/client';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export default class UserUpdateDto implements Prisma.UserUpdateInput {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  username?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(8, 64)
  password?: string;
}
