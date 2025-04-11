import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.scheme";
import { AvatarsService } from "../avatars/avatars.service";

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
  ])],
  controllers: [UsersController],
  providers: [UsersService, AvatarsService],
  exports: [UsersService],
})
export class UsersModule {}
