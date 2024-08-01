import LoginDto from './login.dto';
import { IsString, Length } from 'class-validator';
import { Prisma } from '@prisma/client';

export default class SignupDto extends LoginDto implements Prisma.UserCreateInput {
  @IsString()
  @Length(1, 50)
  username: string;
}
