import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { TodoListCreateDto } from '../dtos';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoListsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: TodoListCreateDto, userId: string) {
    return this.prisma.todoList.create({ data: { ...dto, user: { connect: { id: userId } } } });
  }

  async getOrThrow(where: Prisma.TodoListWhereUniqueInput) {
    return this.prisma.todoList.findUniqueOrThrow({ where });
  }

  async getMany(where: Prisma.TodoListWhereInput) {
    return this.prisma.todoList.findMany({ where });
  }

  async update(id: string, data: Prisma.TodoListUpdateInput, userId?: string) {
    return this.prisma.todoList.update({ where: { id, userId }, data });
  }

  async delete(where: Prisma.TodoListWhereUniqueInput) {
    return this.prisma.todoList.delete({ where });
  }
}
