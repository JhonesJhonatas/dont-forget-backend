import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteOpenedTaskByIdUseCase } from './DeleteOpenedTaskByIdUseCase'

class DeleteOpenedTasksByIdController {
  async handle(request: Request, response: Response) {
    const { taskId } = request.params
    const { id: userId } = request.user

    const deleteOpenedTaskByIdUseCase = container.resolve(
      DeleteOpenedTaskByIdUseCase,
    )

    const deletedTask = await deleteOpenedTaskByIdUseCase.execute(
      taskId,
      userId,
    )

    return response.status(200).json(deletedTask)
  }
}

export { DeleteOpenedTasksByIdController }
