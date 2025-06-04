import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as Mschema, ObjectId, Types } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Mschema.Types.ObjectId, ref: 'User' })
  user: UserDocument | ObjectId;

  @Prop({ type: Mschema.Types.ObjectId, ref: 'Grocery', required: true })
  grocery: Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);