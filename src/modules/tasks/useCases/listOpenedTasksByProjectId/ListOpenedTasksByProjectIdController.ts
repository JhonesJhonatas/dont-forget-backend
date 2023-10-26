import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListOpenedTasksByProjectIdUseCase } from './ListOpenedTasksByProjectIdUseCase'

class ListOpenedTasksByProjectIdController {
  async handle(request: Request, response: Response) {
    const { projectId } = request.params
    const { id: userId } = request.user

    const listOpenedTasks = container.resolve(ListOpenedTasksByProjectIdUseCase)

    const openedTasks = await listOpenedTasks.execute(userId, projectId)

    return response.status(200).json(openedTasks)
  }
}

export { ListOpenedTasksByProjectIdController }
