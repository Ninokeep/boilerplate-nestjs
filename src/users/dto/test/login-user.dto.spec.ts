import { Test, TestingModule } from '@nestjs/testing';
import { forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from '../login-user.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

describe('UserLoginDTO', () => {
  it('should validate correctly the email and password ', async () => {
    const loginUserDTO = new LoginUserDTO();
    loginUserDTO.email = 'toto@gmail.com';
    loginUserDTO.password = '123';
    const errors = await validate(loginUserDTO);

    expect(errors.length).toBe(0);
  });

  it('should fail because the email have white space ', async () => {
    const loginUserDTO = new LoginUserDTO();
    loginUserDTO.email = 'toto  @gmail.com';
    loginUserDTO.password = '123';
    const errors = await validate(loginUserDTO);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should fail because the email empty ', async () => {
    const loginUserDTO = new LoginUserDTO();
    loginUserDTO.email = '';
    loginUserDTO.password = '123';
    const errors = await validate(loginUserDTO);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should fail because the email don t have the @ inside ', async () => {
    const loginUserDTO = new LoginUserDTO();
    loginUserDTO.email = 'toto.com';
    loginUserDTO.password = '123';
    const errors = await validate(loginUserDTO);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should fail because the password is empty ', async () => {
    const loginUserDTO = new LoginUserDTO();
    loginUserDTO.email = 'toto@gmail.com';
    loginUserDTO.password = '';
    const errors = await validate(loginUserDTO);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail because the password contains white space ', async () => {
    const user = {
      email: 'toto@gmail.com',
      password: '            ',
    };
    const loginUserDto = plainToInstance(LoginUserDTO, user);
    const errors = await validate(loginUserDto);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
