import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service'
import { CreateUserDto } from './dto/createUser.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get('get-all')
  findAllUsers() {
    return this.userService.findAllUsers();
  }
}
