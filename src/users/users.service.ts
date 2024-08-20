import { Injectable } from '@nestjs/common';
import { User } from '../utils/interfaces/user';

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

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
