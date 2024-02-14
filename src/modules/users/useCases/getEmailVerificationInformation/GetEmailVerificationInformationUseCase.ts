import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class GetEmailVerificationInformationUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string) {
    const sentVerificationInformation =
      await this.usersRepository.getEmailVerificationByUserId(userId)

    if (!sentVerificationInformation) {
      throw new AppError('Email Verifiation Not Sent Yet', 404)
    }

    return sentVerificationInformation
  }
}

export { GetEmailVerificationInformationUseCase }
