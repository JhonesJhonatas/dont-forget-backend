import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteConcludedTaskByIdUseCase } from './DeleteConcludedTaskByIdUseCase'

class DeleteConcludedTasksByIdController {
  async handle(request: Request, response: Response) {
    const { taskId } = request.params
    const { id: userId } = request.user

    const deleteConcludedTaskByIdUseCase = container.resolve(
      DeleteConcludedTaskByIdUseCase,
    )

    const deletedTask = await deleteConcludedTaskByIdUseCase.execute(
      taskId,
      userId,
    )

    return response.status(200).json(deletedTask)
  }
}

export { DeleteConcludedTasksByIdController }
