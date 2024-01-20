import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { sign, verify } from 'jsonwebtoken'
import { IRefreshTokenDTO } from '../../dtos/IRefreshTokenDTO'
import { AppError } from '../../../../errors/AppError'

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ currentToken, email }: IRefreshTokenDTO) {
    const decoded = verify(currentToken, '10ie1jihasudhasuhd12312easda')

    if (!decoded) {
      throw new AppError('Invalid Token', 400)
    }

    const user = await this.usersRepository.findByEmail(email)

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

export { RefreshTokenUseCase }
