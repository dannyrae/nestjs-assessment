import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateGroceryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}
