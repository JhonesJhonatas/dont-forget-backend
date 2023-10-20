import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../errors/AppError'
import { verify } from 'jsonwebtoken'
import { UserRepository } from '../../modules/users/repositories/implementations/UserRepository'

interface IPayLoad {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token is Missing', 401)
  }

  const [, token] = authHeader.split(' ')

  const { sub: userId } = verify(
    token,
    '10ie1jihasudhasuhd12312easda',
  ) as IPayLoad

  const usersRepository = new UserRepository()

  const user = await usersRepository.findById(userId)

  if (!user) {
    throw new AppError('Token is Invalid', 401)
  }

  request.user = {
    id: userId,
  }

  next()
}
