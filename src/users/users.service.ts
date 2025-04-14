import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.scheme";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as argon2 from "argon2";
import { AvatarsService } from "../avatars/avatars.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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

  async create({ email, hashPassword, nickname }: CreateUserDto): Promise<any> {
    const userExist = await this.userModel.findOne({where: { email }})
    if (userExist)
      throw new ConflictException("User with this email is already existing");

    const logoFilename = await this.avatarsService.generateAndSaveAvatar(nickname)

    const createUser = new this.userModel({
      email,
      nickname,
      password: hashPassword,
      logo: logoFilename,
    });
    const savedUser = await createUser.save();

    return await savedUser.toObject;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec(); // updatedAt обновится автоматически
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
