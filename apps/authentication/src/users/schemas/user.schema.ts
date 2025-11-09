import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const Document = mongoose.Document;
export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({ type: Date, required: true, default: Date.now })
  createdAt: Date;
}

const InitialUserSchema = SchemaFactory.createForClass(User);

InitialUserSchema.pre<User>('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const UserSchema = InitialUserSchema;
