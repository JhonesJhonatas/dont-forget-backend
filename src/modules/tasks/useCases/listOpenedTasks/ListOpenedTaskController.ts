import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListOpenedTasksUseCase } from './listOpenedTasksUseCase'

class ListOpenedTasksController {
  async handle(request: Request, response: Response) {
    const { projectId } = request.params

    const listOpenedTasks = container.resolve(ListOpenedTasksUseCase)

    const openedTasks = await listOpenedTasks.execute(projectId)

    return response.json(openedTasks)
  }
}

export { ListOpenedTasksController }
