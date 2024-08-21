import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let authService: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        JwtService,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
        UsersService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    authService = module.get<AuthService>(AuthService);
  });

  it('GET login success 200 OK send token', async () => {
    const result = {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvdG8iLCJzdWIiOjEsImlhdCI6MTcyNDE3MTQxNCwiZXhwIjoxNzI0MTg1ODE0fQ.cWJBx7aZBW8L-Ol9pPtLJBFOPMa360UgGu1WH-n6flI',
    };

    const loginDto = { username: 'testuser', password: 'testpassword' };

    jest.spyOn(authService, 'login').mockResolvedValue(result);

    const response = await controller.login(loginDto);
    expect(response).toEqual(result);
  });
});
