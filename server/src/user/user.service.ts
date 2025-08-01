import { ConflictException, Injectable } from '@nestjs/common'
import { Roles, User } from 'prisma/generated/prisma'
import { CreateUserDto } from './dto/createUser.dto'
import { PrismaService } from '../prisma.service'
import { hash } from 'argon2'
import { UpdateUserDto } from './dto/updateUser.dto'

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

	async findByEmail(email: string): Promise<User | null> {

		const user = await this.prisma.user.findUnique({
			where: { email }
		})

		return user
	}

	async findById(id: string): Promise<User | null> {

		const user = await this.prisma.user.findUnique({
			where: { id }
		})

		return user
	}

	async deleteUser(id: string): Promise<string> {

		const isExist = await this.findById(id)

		if (isExist) {
			const user = await this.prisma.user.delete({
				where: { id }
			})
		}
		throw new ConflictException('Регистрация не удалась. Пользователь с таким email уже существует.')




		console.log('user: ', user)

		if (user) return `Пользователь с идентификатором ${user.id} удален.`

		return `Удалить пользователя с идентификатором ${id} не удалось.`
	}

	async updateUser(updateUserDto: UpdateUserDto): Promise<User | null> {
		const user = await this.prisma.user.update({
			where: {
				id: updateUserDto.id
			},
			data: {
				email: updateUserDto.email ? updateUserDto.email : '',
				name: updateUserDto.name ? updateUserDto.name : '',
				password: updateUserDto.password ? await hash(updateUserDto.password) : '',
				role: updateUserDto.role ? updateUserDto.role : Roles.USER
			}
		})
		return user
	}
}
