import { ConflictException, Injectable } from '@nestjs/common'
import { User } from 'prisma/generated/prisma'
import { CreateUserDto } from './dto/createUser.dto'
import { PrismaService } from '../prisma.service'
import { hash } from 'argon2'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) { }

	async createUser(userDto: CreateUserDto): Promise<User | null> {

		const isExist = await this.findByEmail(userDto.email)

		if (isExist) {
			throw new ConflictException('Регистрация не удалась. Пользователь с таким email уже существует.')
		}

		const newUser = {
			email: userDto.email,
			name: userDto.name ? userDto.name : '',
			password: userDto.password ? await hash(userDto.password) : ''
		}

		return this.prisma.user.create(
			{
				data: newUser
			}
		)
	}

	async findAllUsers(): Promise<User[] | null> {
		return this.prisma.user.findMany()
	}

	async findByEmail(email: string) {

		const user = await this.prisma.user.findUnique({
			where: { email }
		})

		return user
	}

	async findById(id: string) {

		const user = await this.prisma.user.findUnique({
			where: { id }
		})

		return user
	}
}
