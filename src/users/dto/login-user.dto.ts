import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => {
    return value.trim();
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
