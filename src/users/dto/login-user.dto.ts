import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Transform(({ value }) => {
    return typeof value === 'string' ? value.trim() : value;
  })
  @IsNotEmpty()
  password: string;
}
