import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetEmailVerificationInformationUseCase } from './GetEmailVerificationInformationUseCase'

class GetEmailVerificationInformationController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const getEmailVerificationInformationUseCase = container.resolve(
      GetEmailVerificationInformationUseCase,
    )

    const emailVerificationInformations =
      await getEmailVerificationInformationUseCase.execute(userId)

    return response.json(emailVerificationInformations)
  }
}

export { GetEmailVerificationInformationController }
