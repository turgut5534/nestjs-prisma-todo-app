import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Prisma, Todo } from '../generated/prisma/client';

@Controller('tasks')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findOne(id);
  }

  @Get('user/:userId')
  async findTasksofUser(@Param('userId', ParseIntPipe) id: number) {
    return this.todoService.findTasksofUser(id);
  }

  @Post()
  async create(@Body() data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.todoService.create(data);
  }

  @Post('bulk')
  async createMany(@Body() data: Prisma.TodoCreateManyInput[]): Promise<number> {
    const result = await this.todoService.createMany(data);
    return result.count;
  }

  
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.TodoUpdateInput,
  ) {
    return this.todoService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    
    await this.todoService.remove(id);

    return {
        status: true,
        message: `Todo with ID ${id} has been successfully deleted`,
    }
  }
}
   