import { User } from '@prisma/client'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../IUsersRepository'
import { prismaClient } from '../../../../prisma'
import { IEditUserDTO } from '../../dtos/IEditUserDTO'
import { IEditPasswordDTO } from '../../dtos/IEditPasswordDTO'

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

  async getAllUsers(): Promise<User[]> {
    const usersList = await prismaClient.user.findMany()

    return usersList
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
