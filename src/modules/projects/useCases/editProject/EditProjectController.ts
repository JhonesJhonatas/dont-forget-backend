import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { EditProjectUseCase } from './editProjectUseCase'

class EditProjectController {
  async handle(request: Request, response: Response) {
    const { color, description, id, title } = request.body
    const { id: userId } = request.user

    const editProjectUseCase = container.resolve(EditProjectUseCase)

    const project = await editProjectUseCase.execute({
      color,
      description,
      id,
      title,
      userId,
    })

    return response.status(200).json(project)
  }
}

export { EditProjectController }
