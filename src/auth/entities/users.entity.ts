// Packages
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop({ unique: true, index: true })
  email: string;

  @Prop({ default: false })
  wasDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Remove items that don't need to be displayed
UserSchema.methods.toJSON = function () {
  const { __v, _id, wasDeleted, ...data } = this.toObject();
  data.id = _id;

  return data;
};
