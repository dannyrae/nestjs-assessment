import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignInDto {
  @Transform(
    (params) => {
      const value: string = params.value;
      return value.trim().toLowerCase();
    },
    { toClassOnly: true },
  )
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
