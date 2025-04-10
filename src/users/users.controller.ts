import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schema/user.scheme";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): string {
    return `Get ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): string {
    return `Create user`
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): string {
    return `Update user ${id}`
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string): string {
    return `Delete user ${id}`;
  }
}
