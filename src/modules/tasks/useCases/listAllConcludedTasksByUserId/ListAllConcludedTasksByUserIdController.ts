import { Request, Response } from 'express'
import { ListAllConcludedTasksByUserIdUseCase } from './ListAllConcludedTasksByUserIdUseCase'
import { container } from 'tsyringe'

class ListAllConcludedTasksByUserIdController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const listConcludedTasks = container.resolve(
      ListAllConcludedTasksByUserIdUseCase,
    )

    const concludedTasks = await listConcludedTasks.execute(userId)

    return response.status(200).json(concludedTasks)
  }
}

export { ListAllConcludedTasksByUserIdController }
