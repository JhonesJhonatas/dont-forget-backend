import { User } from '@prisma/client'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IEditUserDTO } from '../dtos/IEditUserDTO'
import { IEditPasswordDTO } from '../dtos/IEditPasswordDTO'
import { GetEmailVerificationSchema } from '../../../mongo/emailVerification/types/emailVerificationTypes'
import { ICreateEmailVerificationDTO } from '../dtos/ICreateEmailVerificationDTO'

interface IUsersRepository {
  create({ name, email, password, role }: ICreateUserDTO): Promise<User>
  getAllUsers(): Promise<User[]>
  getInactiveUsers(): Promise<User[]>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  createEmailVerification({
    userId,
    code,
    created_at,
  }: ICreateEmailVerificationDTO): Promise<GetEmailVerificationSchema>
  getEmailVerificationByUserId(
    userId: string,
  ): Promise<GetEmailVerificationSchema>
  edit({
    id,
    name,
    email,
    role,
    birthDate,
    updated_at,
    lastLogin,
    confirmedEmail,
  }: IEditUserDTO): Promise<User>
  editPassword({ id, password, updated_at }: IEditPasswordDTO): Promise<User>
  delete(id: string): Promise<User>
  deleteEmailVerificationInformation(id: string): Promise<void>
}

export { IUsersRepository }
