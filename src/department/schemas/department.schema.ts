import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Department {
  @Prop()
  name: string;
}

export type DepartmentDocument = Department & Document;
export const DepartmentSchema = SchemaFactory.createForClass(Department);
