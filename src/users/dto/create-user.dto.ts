import { IsEmail, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  email: string;

  hashPassword: string;

  nickname: string;
}