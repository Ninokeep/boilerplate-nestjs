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
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('valideUser fail ', async () => {
    const user = { username: 'toto', password: '123', id: 1 };
    jest.spyOn(userService, 'findOne').mockResolvedValue(user);
    const result = await service.valideUser('toto', '_wrong password');

    expect(result).toBeNull();
  });

  it('valideUser success ', async () => {
    const user = { username: 'toto', password: '123', id: 1 };
    jest.spyOn(userService, 'findOne').mockResolvedValue(user);
    const result = await service.valideUser('toto', '123');

    expect(result).toEqual({ username: user.username, id: user.id });
  });

  it('valideUser fail password empty ', async () => {
    const user = { username: 'toto', password: '123', id: 1 };
    jest.spyOn(userService, 'findOne').mockResolvedValue(user);
    const result = await service.valideUser('toto', '');

    expect(result).toBeNull();
  });

  it('valideUser fail password  and username empty ', async () => {
    const user = { username: 'toto', password: '123', id: 1 };
    jest.spyOn(userService, 'findOne').mockResolvedValue(user);
    const result = await service.valideUser('', '');
    expect(result).toBeNull();
  });
});
