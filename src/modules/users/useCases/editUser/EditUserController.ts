import { Request, Response } from 'express'
import { EditUseUseCase } from './EditUserUseCase'
import { container } from 'tsyringe'

class EditUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user
    const { name, email, birthDate, role } = request.body

    const editUserUseCase = container.resolve(EditUseUseCase)

    const updatedUser = await editUserUseCase.execute({
      id,
      name,
      email,
      role,
      birthDate,
    })

    return response.status(200).json(updatedUser)
  }
}

export { EditUserController }
