import { Injectable } from '@nestjs/common';
import { User } from '../utils/interfaces/user';
import { PrismaService } from '../orm/prisma/prisma.service';
import { User as UserModelPrisma, Prisma } from '@prisma/client';
@Injectable()
export class UsersService {
  //replace by username of DB

  private readonly users = [
    {
      id: 1,
      username: 'toto',
      password: '123',
    },
    {
      id: 2,
      username: 'toto',
      password: 'belinda',
    },
  ];

  constructor(private prismaService: PrismaService) {}

  async findOne(email: string): Promise<UserModelPrisma | undefined> {
    return await this.user({
      email,
    });
  }

  private async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserModelPrisma | undefined> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
}
