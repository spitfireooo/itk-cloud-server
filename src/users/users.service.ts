import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.scheme";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }
}
