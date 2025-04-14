import { Body, Controller, Get, ParseIntPipe, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { SignUpDto } from "./dto/sign-up.dto";
import { Response, Request } from "express";
import { CurrentUser } from "../utils/decorators/current-user.decorator";
import { UserDocument } from "../users/schema/user.scheme";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) res: Response): Promise<string | null> {
    return this.authService.signUp(signUpDto, res);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response
  ): Promise<string | null> {
    return this.authService.generateTokens(user.toObject()._id, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response
  ): Promise<string | null> {
    return this.authService.generateTokens(user.toObject()._id, res);
  }

  @Post('sign-out')
  async logout(@Res({ passthrough: true }) res: Response): Promise<string> {
    return this.authService.signOut(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: UserDocument,) {
    console.log(user)
  }
}
