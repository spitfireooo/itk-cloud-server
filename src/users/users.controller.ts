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
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getOne(id);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.signUp(createUserDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<User | null> {
    return this.userService.delete(id);
  }
}
