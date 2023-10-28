import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllOpenedTasksUseCase } from './ListAllOpenedTasksUseCase'

class ListAllOpenedTasksController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const listOpenedTasks = container.resolve(ListAllOpenedTasksUseCase)

    const openedTasks = await listOpenedTasks.execute(userId)

    return response.status(200).json(openedTasks)
  }
}

export { ListAllOpenedTasksController }
