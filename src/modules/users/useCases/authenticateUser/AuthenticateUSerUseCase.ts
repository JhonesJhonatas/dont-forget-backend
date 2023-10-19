import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email ou password incorrect!', 404)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!', 404)
    }

    const token = sign({}, '10ie1jihasudhasuhd12312easda', {
      subject: user.id,
      expiresIn: '1d',
    })

    const tokenResponse: IResponse = {
      user: {
        name: user.name,
        email,
      },
      token,
    }

    return tokenResponse
  }
}

export { AuthenticateUserUseCase }
