import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../orm/prisma/prisma.service';
import { User as UserModelPrisma, Prisma } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  //replace by username of DB

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

  async create(userDto: CreateUserDTO): Promise<UserModelPrisma> {
    const user = await this.user({ email: userDto.email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    return await this.prismaService.user.create({
      data: userDto,
    });
  }
}
