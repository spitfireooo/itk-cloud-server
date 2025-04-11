import { IsEmail, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(4, { message: 'Nickname must be more than 6 symbols' })
  @MaxLength(30, { message: 'Nickname must be less than 30 symbols' })
  readonly nickname: string;

  @IsEmail()
  readonly email: string;

  @MinLength(4, { message: 'Nickname must be more than 6 symbols' })
  @MaxLength(20, { message: 'Nickname must be less than 20 symbols' })
  readonly password: string;

  readonly logo: string;
}