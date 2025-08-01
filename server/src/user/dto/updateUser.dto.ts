import { IsEmail, IsString, Min } from 'class-validator'
import { Roles } from 'prisma/generated/prisma'

export class UpdateUserDto {
	@IsString()
	id: string

	@IsEmail()
	@IsString()
	email?: string

	@IsString()
	name?: string

	@IsString()
	@Min(6)
	password?: string

	@IsString()
	role?: Roles
}