import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'

interface SendEmailVerificationCodeUseCaseProps {
  userId: string
  code: string
}

@injectable()
class SendEmailVerificationCodeUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ userId, code }: SendEmailVerificationCodeUseCaseProps) {
    const [userCompleteData, sentVerificationCodeData] = await Promise.all([
      this.usersRepository.findById(userId),
      this.usersRepository.getEmailVerificationByUserId(userId),
    ])

    if (!sentVerificationCodeData) {
      throw new AppError('Email confirmation not sent', 400)
    }

    if (sentVerificationCodeData.code !== code) {
      throw new AppError('Incorrect Code', 400)
    }

    await Promise.all([
      this.usersRepository.edit({
        ...userCompleteData,
        confirmedEmail: true,
      }),
      this.usersRepository.deleteEmailVerificationInformation(
        sentVerificationCodeData._id.toString(),
      ),
    ])

    return 'Email Confirmed'
  }
}

export { SendEmailVerificationCodeUseCase }
