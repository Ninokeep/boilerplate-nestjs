import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../orm/prisma/prisma.service';
import { User as UserModelPrisma, Prisma } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { PageOptionDto } from '../commons/dto/pagination/page-option.dto';
import { PageMetaDto } from '../commons/dto/pagination/page-meta.dto';
import { PageDto } from 'src/commons/dto/pagination/page.dto';
@Injectable()
export class UsersService {
  //replace by username of DB

  constructor(private prismaService: PrismaService) {}

  async findOne(email: string): Promise<UserModelPrisma | undefined> {
    return await this.user({
      email,
    });
  }

  async findAll(
    paginationOption: PageOptionDto,
    params?: any,
  ): Promise<PageDto<UserModelPrisma>> {
    const item: number = await this.prismaService.user.count();

    const users = await this.prismaService.user.findMany({
      skip: paginationOption.skip,
      take: paginationOption.take,
      orderBy: {
        id: paginationOption.order.toLocaleLowerCase() as any,
      },
      where: params,
    });

    const pageMetaDto = new PageMetaDto({
      pageOptionDto: paginationOption,
      itemCount: item,
    });

    return new PageDto(users, pageMetaDto);
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
