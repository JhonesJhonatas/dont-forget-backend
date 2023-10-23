import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { EditTaskUseCase } from './editTaskUseCase'

class EditTaskController {
  async handle(request: Request, response: Response) {
    const { description, maturity, priority, projectId, status, title, id } =
      request.body

    const editTaskUseCase = container.resolve(EditTaskUseCase)

    const task = await editTaskUseCase.execute({
      description,
      maturity,
      priority,
      projectId,
      status,
      title,
      id,
    })

    return response.status(200).json(task)
  }
}

export { EditTaskController }
