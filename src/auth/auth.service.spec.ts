import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,

        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            user: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('valideUser fail ', async () => {
    const user = {
      id: 1,
      email: 'toto@gmail.com',
      name: 'toto',
      password: 'éezez',
      created_at: new Date(2024, 7, 25, 14, 30, 0),
      update_at: new Date(2024, 7, 25, 14, 30, 0),
      status: null,
    };
    jest.spyOn(userService, 'findOne').mockResolvedValue(user);
    const result = await service.valideUser('toto', '_wrong password');

    expect(result).toBeNull();
  });

  it('valideUser success ', async () => {
    const user = {
      id: 1,
      email: 'toto@gmail.com',
      name: 'toto',
      password: '123',
      created_at: new Date(2024, 7, 25, 14, 30, 0),
      update_at: new Date(2024, 7, 25, 14, 30, 0),
      status: null,
    };

    jest.spyOn(UsersService.prototype as any, 'user').mockResolvedValue(user);

    jest.spyOn(userService, 'findOne').mockResolvedValue(user);
    const result = await service.valideUser('toto@gmail.com', '123');

    delete user.password;
    expect(result).toEqual(user);
  });

  it('valideUser fail password empty ', async () => {
    const user = {
      id: 1,
      email: 'toto@gmail.com',
      name: 'toto',
      password: 'éezez',
      created_at: new Date(2024, 7, 25, 14, 30, 0),
      update_at: new Date(2024, 7, 25, 14, 30, 0),
      status: null,
    };
    jest.spyOn(userService, 'findOne').mockResolvedValue(user);
    const result = await service.valideUser('toto', '');

    expect(result).toBeNull();
  });

  it('valideUser fail password  and username empty ', async () => {
    const user = {
      id: 1,
      email: 'toto@gmail.com',
      name: 'toto',
      password: 'éezez',
      created_at: new Date(2024, 7, 25, 14, 30, 0),
      update_at: new Date(2024, 7, 25, 14, 30, 0),
      status: null,
    };
    jest.spyOn(userService, 'findOne').mockResolvedValue(user);
    const result = await service.valideUser('', '');
    expect(result).toBeNull();
  });
});
