import { IsEmail, IsString, Min } from 'class-validator'

export class CreateUserDto {
	@IsEmail()
	@IsString()
	email: string

	@IsString()
	name?: string
	
	@IsString()
	@Min(6)
	password: string
}