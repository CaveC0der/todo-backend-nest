import { Prisma } from '@prisma/client';
import { IsOptional, Length } from 'class-validator';

export default class TodoListCreateDto implements Prisma.TodoListCreateWithoutUserInput {
  @Length(1, 50)
  title: string;

  @IsOptional()
  @Length(1, 300)
  description?: string;
}
