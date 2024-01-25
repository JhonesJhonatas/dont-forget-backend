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

  async getInactiveUsers(): Promise<User[]> {
    const twoMonthsAgo = new Date()
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)

    const inactiveUsers = await prismaClient.user.findMany({
      where: {
        lastLogin: {
          lt: twoMonthsAgo,
        },
      },
    })

    return inactiveUsers
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
    updated_at,
    lastLogin,
  }: IEditUserDTO): Promise<User> {
    const user = await prismaClient.user.update({
      where: { id },
      data: { name, email, role, birthDate, lastLogin, updated_at },
    })

    return user
  }

  async editPassword({
    id,
    password,
    updated_at,
  }: IEditPasswordDTO): Promise<User> {
    const user = await prismaClient.user.update({
      where: { id },
      data: { password, updated_at },
    })

    return user
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await prismaClient.user.delete({
      where: {
        id,
      },
    })

    return deletedUser
  }
}

export { UserRepository }
