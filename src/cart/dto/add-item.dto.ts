import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

export class AddItemDto {
  @IsMongoId()
  @IsNotEmpty()
  grocery: ObjectId;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
