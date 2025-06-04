import { Transform, Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  @Transform((params) => {
    const value: string = params.value;
    return value.trim().toLowerCase();
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @Transform(
    (params) => {
      const value: string = params.value;
      return value.trim().toLowerCase();
    },
    { toClassOnly: true },
  )
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
