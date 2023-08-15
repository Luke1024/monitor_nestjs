import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Contact, ContactSchema } from './contact.schema';


export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop()
  key: string;

  @Prop()
  logged: string;

  @Prop({ type: [ContactSchema] })
  contacts: Contact[];
}

export const UserSchema = SchemaFactory.createForClass(User);
