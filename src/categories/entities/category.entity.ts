// Packages
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ unique: true, index: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ default: false })
  wasDeleted: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// Remove items that don't need to be displayed
CategorySchema.methods.toJSON = function () {
  const { __v, wasDeleted, _id, ...category } = this.toObject();

  category.id = _id;

  return category;
};
