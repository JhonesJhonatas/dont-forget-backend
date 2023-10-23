import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProjectUseCase } from './createProjectUseCase'

class CreateProjectController {
  async handle(request: Request, response: Response) {
    const { color, createdAt, description, title } = request.body
    const { id: userId } = request.user

    const createProjectUseCase = container.resolve(CreateProjectUseCase)

    const project = await createProjectUseCase.execute({
      color,
      createdAt,
      description,
      title,
      userId,
    })

    return response.status(201).json(project)
  }
}

export { CreateProjectController }
