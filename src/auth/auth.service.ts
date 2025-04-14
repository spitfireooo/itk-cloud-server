import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "../utils/types/types";
import { hash, verify } from "argon2";
import { SignUpDto } from "./dto/sign-up.dto";
import { User } from "../users/schema/user.scheme";
import { ConfigService } from "@nestjs/config";
import { Response } from "express"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const userExist = await this.usersService.findOne(email);
    const passwordIsValid = await verify(userExist.password, password);

    if (userExist && passwordIsValid)
      return userExist;
    throw new UnauthorizedException('User or password are incorrect!');
  }

  async signUp({ email, password, nickname }: SignUpDto, res: Response): Promise<string | null> {
    const hashPassword = await hash(password)

    const createUser = await this.usersService.create({
      email,
      hashPassword,
      nickname
    })

    return await this.generateTokens(createUser._id, res);
  }

  async generateTokens(userId: string, res: Response) {
    const accessToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
        expiresIn: this.configService.getOrThrow("JWT_ACCESS_EXPIRES"),
      }
    )
    const refreshToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
        expiresIn: this.configService.getOrThrow("JWT_REFRESH_EXPIRES"),
      }
    )

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      expires: this.configService.getOrThrow("JWT_REFRESH_EXPIRES"),
    })

    return accessToken
  }

  async signOut(res: Response): Promise<string> {
    res.cookie("refreshToken", "")
    return "Logged out"
  }
}
