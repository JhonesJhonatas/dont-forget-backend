import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListOpenedTasksUseCase } from './listOpenedTasksUseCase'

class ListOpenedTasksController {
  async handle(request: Request, response: Response) {
    const { projectId } = request.params
    const { id: userId } = request.user

    const listOpenedTasks = container.resolve(ListOpenedTasksUseCase)

    const openedTasks = await listOpenedTasks.execute(projectId, userId)

    return response.json(openedTasks)
  }
}

export { ListOpenedTasksController }
