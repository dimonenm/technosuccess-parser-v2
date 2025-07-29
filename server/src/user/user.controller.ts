import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/createUser.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }
  @Get('get-all')
  findAllUsers() {
    return this.userService.findAllUsers()
  }
  @Get('find-by-id')
  findById(@Query() param: { id: string }) {
    return param.id
  }
}
