import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma'

@Injectable()
export class UserService {
	async createUser(email: string , password: string): Promise<User> {

	}
}
