import { User } from '@prisma/client'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IEditUserDTO } from '../dtos/IEditUserDTO'
import { IEditPasswordDTO } from '../dtos/IEditPasswordDTO'

interface IUsersRepository {
  create({ name, email, password, role }: ICreateUserDTO): Promise<User>
  getAllUsers(): Promise<User[]>
  getInactiveUsers(): Promise<User[]>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  edit({
    id,
    name,
    email,
    role,
    birthDate,
    updated_at,
    lastLogin,
  }: IEditUserDTO): Promise<User>
  editPassword({ id, password, updated_at }: IEditPasswordDTO): Promise<User>
  delete(id: string): Promise<User>
}

export { IUsersRepository }
