import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { PageOptionDto } from 'src/commons/dto/pagination/page-option.dto';
import { PageDto } from 'src/commons/dto/pagination/page.dto';
import { User as UserModelPrisma } from '@prisma/client';
@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get()
  @ApiOkResponse()
  async findAll(
    @Query() pageOptionDto: PageOptionDto,
    params?: any,
  ): Promise<PageDto<UserModelPrisma>> {
    return this.userService.findAll(pageOptionDto, params);
  }
}
