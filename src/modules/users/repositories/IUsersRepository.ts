import { User } from '@prisma/client'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IEditUserDTO } from '../dtos/IEditUserDTO'
import { IEditPasswordDTO } from '../dtos/IEditPasswordDTO'
import { NotificationSchema } from '../../../mongo/schemaTypes'
import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO'

interface IUsersRepository {
  create({ name, email, password, role }: ICreateUserDTO): Promise<User>
  createNotification({
    type,
    title,
    description,
    read,
  }: ICreateNotificationDTO): Promise<NotificationSchema>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  edit({ id, name, email, role, birthDate }: IEditUserDTO): Promise<User>
  editPassword({ id, password }: IEditPasswordDTO): Promise<User>
}

export { IUsersRepository }
