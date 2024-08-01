import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/auth/guards';
import { TodoListsService } from '../services';
import { User } from 'src/auth/decorators';
import { TodoListCreateDto, TodoListUpdateDto } from '../dtos';
import { NotEmptyObjectPipe } from 'src/common/pipes';

@UseGuards(AccessGuard)
@Controller('todo-lists')
export class TodoListsController {
  constructor(private readonly todoListsService: TodoListsService) {}

  @Post()
  async create(@User('id') userId: string, @Body() dto: TodoListCreateDto) {
    return this.todoListsService.create(dto, userId);
  }

  @Get()
  async getAll(@User('id') userId: string) {
    return this.todoListsService.getMany({ userId });
  }

  @Get(':id')
  async get(@User('id') userId: string, @Param('id') id: string) {
    return this.todoListsService.getOrThrow({ id, userId });
  }

  @Patch(':id')
  async update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body(NotEmptyObjectPipe) dto: TodoListUpdateDto,
  ) {
    return this.todoListsService.update(id, dto, userId);
  }

  @Delete(':id')
  async delete(@User('id') userId: string, @Param('id') id: string) {
    await this.todoListsService.delete({ id, userId });
  }
}
