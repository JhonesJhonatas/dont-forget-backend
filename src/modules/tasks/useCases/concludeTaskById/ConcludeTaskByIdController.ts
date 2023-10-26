import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ConcludeTaskByIdUseCase } from './ConcludeTaskByIdUseCase'

class ConcludeTaskByIdController {
  async handle(request: Request, response: Response) {
    const {
      createdAt,
      description,
      maturity,
      priority,
      projectId,
      title,
      status,
    } = request.body
    const { id: userId } = request.user

    const concludeTaskByIdUseCase = container.resolve(ConcludeTaskByIdUseCase)

    const concludedTask = await concludeTaskByIdUseCase.execute({
      createdAt,
      description,
      maturity,
      priority,
      projectId,
      title,
      userId,
      status,
    })

    return response.status(201).json(concludedTask)
  }
}

export { ConcludeTaskByIdController }
