import { User } from '@prisma/client'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../IUsersRepository'
import { prismaClient } from '../../../../prisma'

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
}

export { UserRepository }
