import { User } from '@prisma/client'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../IUsersRepository'
import { prismaClient } from '../../../../prisma'
import { IEditUserDTO } from '../../dtos/IEditUserDTO'
import { IEditPasswordDTO } from '../../dtos/IEditPasswordDTO'
import { NotificationSchema } from '../../../../mongo/schemaTypes'
import { ICreateNotificationDTO } from '../../dtos/ICreateNotificationDTO'
import { NotificationModel } from '../../../../mongo/mongoModels'

class UserRepository implements IUsersRepository {
  async create({
    name,
    email,
    password,
    role,
    birthDate,
  }: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        birthDate,
        password,
        role,
      },
    })

    return user
  }

  async createNotification({
    userId,
    type,
    title,
    description,
    read,
  }: ICreateNotificationDTO): Promise<NotificationSchema> {
    const notificationBody = { userId, type, title, description, read }

    const notificationsModel = new NotificationModel(notificationBody)

    const savedNotification = await notificationsModel.save()

    return savedNotification
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: { email },
    })

    return user as User
  }

  async findById(id: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: { id },
    })

    return user as User
  }

  async edit({
    id,
    name,
    email,
    role,
    birthDate,
  }: IEditUserDTO): Promise<User> {
    const user = await prismaClient.user.update({
      where: { id },
      data: { name, email, role, birthDate },
    })

    return user
  }

  async editPassword({ id, password }: IEditPasswordDTO): Promise<User> {
    const user = await prismaClient.user.update({
      where: { id },
      data: { password },
    })

    return user
  }
}

export { UserRepository }
