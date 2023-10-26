import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListConcludedTasksByProjectIdUseCase } from './ListConcludedTasksByProjectIdUseCase'

class ListConcludedTasksByProjectIdController {
  async handle(request: Request, response: Response) {
    const { projectId } = request.params
    const { id: userId } = request.user

    const listOpenedTasksUseCase = container.resolve(
      ListConcludedTasksByProjectIdUseCase,
    )

    const openedTasks = await listOpenedTasksUseCase.execute(userId, projectId)

    return response.status(200).json(openedTasks)
  }
}

export { ListConcludedTasksByProjectIdController }
