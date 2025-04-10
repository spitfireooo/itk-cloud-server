import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../users/schema/user.scheme";
import { Types, ObjectId } from "mongoose";

@Schema({
  timestamps: true,
})
export class Entity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ext: string;

  @Prop()
  accessLink: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  accessUser: User[];
  // accessUser: Types.ObjectId[];

  @Prop({ default: 0 })
  size: number;

  @Prop({ default: '' })
  path: string;

  @Prop({ type: Types.ObjectId, ref: 'Entity' })
  parent: Entity;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Entity' }] })
  child: Entity[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const EntitySchema = SchemaFactory.createForClass(Entity);
