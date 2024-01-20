import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RefreshTokenUseCase } from './refreshTokenUseCase'

class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { currentToken, email } = request.body

    const authenticateUserUseCase = container.resolve(RefreshTokenUseCase)

    const tokenResponse = await authenticateUserUseCase.execute({
      currentToken,
      email,
    })

    return response.json(tokenResponse)
  }
}

export { RefreshTokenController }
