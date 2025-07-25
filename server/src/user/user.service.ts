import { Injectable } from '@nestjs/common'
import { User } from 'generated/prisma'
import { CreateUserDto } from './dto/createUser.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) { }

	async createUser(userDto: CreateUserDto): Promise<User | null> {
		return this.prisma.user.create(userDto)
	}
}
