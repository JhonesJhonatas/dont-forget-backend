import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllOpenedTasksUseCase } from './ListAllOpenedTasksUseCase'

class ListAllOpenedTasksController {
  async handle(request: Request, response: Response) {
    const { projectId } = request.params

    const listOpenedTasks = container.resolve(ListAllOpenedTasksUseCase)

    const openedTasks = await listOpenedTasks.execute(projectId)

    return response.status(200).json(openedTasks)
  }
}

export { ListAllOpenedTasksController }
