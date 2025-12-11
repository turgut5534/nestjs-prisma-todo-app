import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma, Todo } from '../generated/prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  // Get all users
  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  // Get user by ID
  async findOne(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async findTasksofUser(userId: number): Promise<Todo[] | null> {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({ data });
  }

  async createMany(data: Prisma.TodoCreateManyInput[]): Promise<{ count: number }> {
    return this.prisma.todo.createMany({
        data,
    });
  }

  async update(id: number, data: Prisma.TodoUpdateInput): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
