import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { PageOptionDto } from '../commons/dto/pagination/page-option.dto';
import { PageDto } from '../commons/dto/pagination/page.dto';
import { User as UserModelPrisma } from '@prisma/client';
import { FindAllUserDTO } from './dto/find-all-user.dto';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOkResponse()
  async findAll(
    @Query() pageOptionDto: PageOptionDto,
    @Query()
    params?: FindAllUserDTO,
  ): Promise<PageDto<UserModelPrisma>> {
    return this.userService.findAll(pageOptionDto, params);
  }
}
