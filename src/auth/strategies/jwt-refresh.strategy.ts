import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../../users/users.service";
import { Request } from "express"
import { JwtPayload } from "../../utils/types/jwt-payload";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
	) {
		super({
			jwtFromRequest: (req: Request) => {
				return req.cookies['refreshToken'];
			},
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_REFRESH_SECRET')
		});
	}

	async validate({ userId }: JwtPayload) {
		const user = await this.usersService.getOne(userId)
		if (!user)
			throw new UnauthorizedException();
		return user;
	}
}