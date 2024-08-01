import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { TodoItemCreateDto } from '../dtos';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: TodoItemCreateDto, listId: string, userId: string) {
    return this.prisma.todoItem.create({
      data: { ...dto, todoList: { connect: { id: listId, userId } } },
    });
  }

  async getOrThrow(where: Prisma.TodoItemWhereUniqueInput) {
    return this.prisma.todoItem.findUniqueOrThrow({ where });
  }

  async getMany(where: Prisma.TodoItemWhereInput) {
    return this.prisma.todoItem.findMany({ where });
  }

  async update(id: string, data: Prisma.TodoListUpdateInput, listId?: string, userId?: string) {
    return this.prisma.todoItem.update({ where: { id, todoList: { id: listId, userId } }, data });
  }

  async delete(where: Prisma.TodoItemWhereUniqueInput) {
    return this.prisma.todoItem.delete({ where });
  }
}
