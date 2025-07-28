import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service'
import { CreateUserDto } from './dto/createUser.dto'

@Controller('user')
export class UserController {
	constructor (private userService: UserService){}

	@Post('create')
	createUser(@Body() createUserDto: CreateUserDto){
		console.log('createUser: ');
		return this.userService.createUser(createUserDto)
	}
}
