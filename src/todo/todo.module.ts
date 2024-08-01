import { Module } from '@nestjs/common';
import { TodoItemsService, TodoListsService } from './services';
import { TodoItemsController, TodoListsController } from './controllers';

@Module({
  providers: [TodoListsService, TodoItemsService],
  controllers: [TodoListsController, TodoItemsController],
})
export class TodoModule {}
