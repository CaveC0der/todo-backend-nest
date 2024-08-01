import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export default class UserDto implements User {
  @Exclude() id: string;
  @Expose() username: string;
  @Expose() email: string;
  @Exclude() password: string;
  @Expose() avatar: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}
