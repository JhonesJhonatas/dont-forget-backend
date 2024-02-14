import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SendEmailVerificationCodeUseCase } from './SendEmailVerificationCodeUseCase'

class SendEmailVerificationCodeController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user
    const { code } = request.body

    const sendEmailVerificationCodeUseCase = container.resolve(
      SendEmailVerificationCodeUseCase,
    )

    const sendEmaiCodeResponse = await sendEmailVerificationCodeUseCase.execute(
      {
        userId,
        code,
      },
    )

    return response.json(sendEmaiCodeResponse)
  }
}

export { SendEmailVerificationCodeController }
