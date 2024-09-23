import { validate } from 'class-validator';
import { CreateUserDTO } from '../create-user.dto';

describe('CreateUserDTO', () => {
  it('should validate a correct DTO', async () => {
    const dto = new CreateUserDTO();
    dto.email = 'test@example.com';
    dto.password = 'StrongPassword123!';
    dto.name = 'John Doe';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should not validate an incorrect email', async () => {
    const dto = new CreateUserDTO();
    dto.email = 'invalid-email';
    dto.password = 'StrongPassword123!';
    dto.name = 'John Doe';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });

  it('should not validate a weak password', async () => {
    const dto = new CreateUserDTO();
    dto.email = 'test@example.com';
    dto.password = 'weak';
    dto.name = 'John Doe';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
  });

  it('should not validate an empty name', async () => {
    const dto = new CreateUserDTO();
    dto.email = 'test@example.com';
    dto.password = 'StrongPassword123!';
    dto.name = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should not validate a weak password without the uppercase word', async () => {
    const dto = new CreateUserDTO();
    dto.email = 'test@example.com';
    dto.password = 'weakweakweak1@';
    dto.name = 'John Doe';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
  });

  it('should not validate a weak password without the good length', async () => {
    const dto = new CreateUserDTO();
    dto.email = 'test@example.com';
    dto.password = 'Weak@';
    dto.name = 'John Doe';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
  });
});
