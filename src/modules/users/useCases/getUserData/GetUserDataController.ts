import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetUserDataUseCase } from './GetUserDataUseCase'

class GetUserDataController {
  async handle(request: Request, response: Response) {
    const { id } = request.user

    const getUserDataUseCase = container.resolve(GetUserDataUseCase)

    const { name, email, role, birthDate } =
      await getUserDataUseCase.execute(id)

    return response.status(200).json({ name, email, role, birthDate })
  }
}

export { GetUserDataController }
