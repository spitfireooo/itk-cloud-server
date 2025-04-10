import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop()
  nickname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  logo: string;
}