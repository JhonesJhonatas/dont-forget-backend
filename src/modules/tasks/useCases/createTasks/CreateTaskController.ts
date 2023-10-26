import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTaskUseCase } from './createTaskUseCase'

class CreateTaskController {
  async handle(request: Request, response: Response) {
    const { description, maturity, priority, projectId, status, title } =
      request.body
    const { id: userId } = request.user

    const createTaskUseCase = container.resolve(CreateTaskUseCase)

    const task = await createTaskUseCase.execute({
      description,
      maturity,
      priority,
      projectId,
      status,
      title,
      userId,
    })

    return response.status(201).json(task)
  }
}

export { CreateTaskController }
