import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/auth/guards';
import { TodoItemsService } from '../services';
import { User } from 'src/auth/decorators';
import { TodoItemCreateDto, TodoItemUpdateDto } from '../dtos';
import { NotEmptyObjectPipe } from 'src/common/pipes';

@UseGuards(AccessGuard)
@Controller('todo-lists')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Post(':listId/todo-items')
  async create(
    @User('id') userId: string,
    @Param('listId') listId: string,
    @Body() dto: TodoItemCreateDto,
  ) {
    return this.todoItemsService.create(dto, listId, userId);
  }

  @Get(':listId/todo-items')
  async getAll(@User('id') userId: string, @Param('listId') listId: string) {
    return this.todoItemsService.getMany({ todoList: { id: listId, userId } });
  }

  @Get(':listId/todo-items/:itemId')
  async get(
    @User('id') userId: string,
    @Param('itemId') id: string,
    @Param('listId') listId: string,
  ) {
    return this.todoItemsService.getOrThrow({ id, todoList: { id: listId, userId } });
  }

  @Patch(':listId/todo-items/:itemId')
  async update(
    @User('id') userId: string,
    @Param('itemId') id: string,
    @Param('listId') listId: string,
    @Body(NotEmptyObjectPipe) dto: TodoItemUpdateDto,
  ) {
    return this.todoItemsService.update(id, dto, listId, userId);
  }

  @Delete(':listId/todo-items/:itemId')
  async delete(
    @User('id') userId: string,
    @Param('itemId') id: string,
    @Param('listId') listId: string,
  ) {
    await this.todoItemsService.delete({ id, todoList: { id: listId, userId } });
  }
}
