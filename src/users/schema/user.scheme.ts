import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Types} from "mongoose";
import { Entity } from "../../entities/schema/entity.schema";


@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, trim: true })
  nickname: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  logo: string;

  @Prop({ default: 0 })
  sizeUsed: number;

  @Prop({ default: 1024 * 1024 * 1024 * 2 }) // 2 gb
  sizeLimit: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Entity' }] })
  entities: Entity[];
}

export const UserSchema = SchemaFactory.createForClass(User);