import { IsDefined, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class SignUpDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  nickname: string;
}