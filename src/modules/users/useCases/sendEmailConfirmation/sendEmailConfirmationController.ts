import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SendEmailConfirmationUseCase } from './sendEmailConfirmationUseCase'

class SendEmailConfirmationController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const sendEmailConfirmationUseCase = container.resolve(
      SendEmailConfirmationUseCase,
    )

    const emailResponse = await sendEmailConfirmationUseCase.execute(userId)

    return response.json(emailResponse)
  }
}

export { SendEmailConfirmationController }
