import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { Response } from "express";
import { CurrentUser } from "../utils/decorators/current-user.decorator";
import { UserDocument } from "../users/schema/user.scheme";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) res: Response): Promise<string | null> {
    return this.authService.signUp(signUpDto, res);
  }

  @UseGuards(AuthGuard("local"))
  @Post('sign-in')
  async signIn(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response
  ): Promise<string | null> {
    return this.authService.generateTokens(user.toObject()._id, res);
  }

  @Post('sign-out')
  async signOut(@Res({ passthrough: true }) res: Response): Promise<string> {
    return this.authService.signOut(res);
  }

  @UseGuards(AuthGuard("jwt-refresh"))
  @Post('refresh')
  async refresh(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response
  ): Promise<string | null> {
    return this.authService.generateTokens(user.toObject()._id, res);
  }

  @UseGuards(AuthGuard("jwt-refresh"))
  @Get('profile')
  getProfile(@CurrentUser() user: UserDocument) {
    const userObject = user.toObject(); // Преобразуем в обычный JS-объект
    delete userObject.password; // Удаляем свойство password

    return userObject;
  }
}
