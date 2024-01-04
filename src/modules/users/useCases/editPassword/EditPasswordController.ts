import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { EditPasswordUseCase } from './EditPasswordUseCase'

class EditPasswordController {
  async handle(request: Request, response: Response) {
    const { id } = request.user
    const { oldPassword, password } = request.body

    const editPasswordUserCase = container.resolve(EditPasswordUseCase)

    const updatedUser = await editPasswordUserCase.execute({
      id,
      oldPassword,
      password,
    })

    return response.status(200).json(updatedUser)
  }
}

export { EditPasswordController }
