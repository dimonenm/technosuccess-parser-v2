import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'

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
  findById(@Query() params: { id: string }) {
    return this.userService.findById(params.id)
  }
  @Delete('delete')
  deleteUser(@Query() params: { id: string }) {
    return this.userService.deleteUser(params.id)
  }
  @Put('update')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto)
  }
}
