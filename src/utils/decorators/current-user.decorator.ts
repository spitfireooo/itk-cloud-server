import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User, UserDocument } from "../../users/schema/user.scheme";
import { Request } from "express"

export const CurrentUser = createParamDecorator((key: keyof UserDocument, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest()
  return key ? req.user[key] : req.user
})