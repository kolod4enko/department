import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Department } from "../../department/schemas/department.schema";
import { Document, Types } from "mongoose";
import * as mongoose from 'mongoose'

@Schema()
export class Users {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department: Types.ObjectId;
}

export type UsersDocument = Users & Document;
export const UsersSchema = SchemaFactory.createForClass(Users);
