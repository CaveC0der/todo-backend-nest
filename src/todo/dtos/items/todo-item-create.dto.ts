import { Priority, Prisma } from '@prisma/client';
import { IsEnum, IsOptional, Length } from 'class-validator';

export default class TodoItemCreateDto implements Prisma.TodoItemCreateWithoutTodoListInput {
  @Length(1, 50)
  title: string;

  @IsOptional()
  @Length(1, 300)
  description?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;
}
