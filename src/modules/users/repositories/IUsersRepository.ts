import { User } from '@prisma/client'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IEditUserDTO } from '../dtos/IEditUserDTO'
import { IEditPasswordDTO } from '../dtos/IEditPasswordDTO'

interface IUsersRepository {
  create({ name, email, password, role }: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  edit({ id, name, email, role, birthDate }: IEditUserDTO): Promise<User>
  editPassword({ id, password }: IEditPasswordDTO): Promise<User>
}

export { IUsersRepository }
