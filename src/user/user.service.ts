import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '../generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Get all users
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { todos: true }, // optionally include posts
    });
  }

  // Get user by ID
  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { todos: true },
    });
  }

  // Create a new user
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  // Update user by ID
  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Delete user by ID
  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
