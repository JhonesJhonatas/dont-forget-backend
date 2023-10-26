import { User } from '@prisma/client'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

interface IUsersRepository {
  create({ name, email, password, role }: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}

export { IUsersRepository }
