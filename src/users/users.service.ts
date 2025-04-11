import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.scheme";
import { Model, ModifyResult } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as argon2 from "argon2";
import { AvatarsService } from "../avatars/avatars.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly avatarsService: AvatarsService,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { email, nickname, password } = createUserDto;

    const userExist = await this.userModel.findOne({
      where: { email: createUserDto.email },
    })
    if (userExist)
      throw new BadRequestException("User already exists");

    const logoFilename = await this.avatarsService.generateAndSaveAvatar(nickname)
    const createUser = new this.userModel({
      email,
      nickname,
      password: await argon2.hash(password),
      logo: logoFilename,
    });

    return createUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec(); // updatedAt обновится автоматически
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
