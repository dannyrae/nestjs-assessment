import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as Mschema } from 'mongoose';
import { isEmail } from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
        lowercase: true,
    })
    username: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value: string) => isEmail(value),
            message: 'Invalid email format',
        },
    })
    email: string;

    @Prop({ type: String, required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
