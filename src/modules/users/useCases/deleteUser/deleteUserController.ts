import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteUserUseCase } from './deleteUserUseCase'

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const deleteUserUseCase = container.resolve(DeleteUserUseCase)

    const deletedUser = await deleteUserUseCase.execute(userId)

    return response.status(200).json(deletedUser)
  }
}

export { DeleteUserController }
