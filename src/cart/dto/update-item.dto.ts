import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateItemDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}