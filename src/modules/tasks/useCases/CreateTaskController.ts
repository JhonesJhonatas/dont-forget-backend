import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTaskUseCase } from './createTaskUseCase'

class CreateTaskController {
  async handle(request: Request, response: Response) {
    const {
      createdAt,
      description,
      maturity,
      priority,
      projectId,
      status,
      title,
      completedAt,
    } = request.body

    const createTaskUseCase = container.resolve(CreateTaskUseCase)

    const task = await createTaskUseCase.execute({
      createdAt,
      description,
      maturity,
      priority,
      projectId,
      status,
      title,
      completedAt,
    })

    return response.status(201).json(task)
  }
}

export { CreateTaskController }
