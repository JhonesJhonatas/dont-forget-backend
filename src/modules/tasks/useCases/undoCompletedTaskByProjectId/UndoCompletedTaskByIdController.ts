import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UndoCompletedTaskByIdUseCase } from './UndoCompletedTaskByIdUseCase'

class UndoCompletedTaskByIdController {
  async handle(request: Request, response: Response) {
    const { completedTaskId } = request.body
    const { id: userId } = request.user

    const undoCompletedTaskByIdUseCase = container.resolve(
      UndoCompletedTaskByIdUseCase,
    )

    const openedTask = await undoCompletedTaskByIdUseCase.execute({
      userId,
      completedTaskId,
    })

    return response.status(201).json(openedTask)
  }
}

export { UndoCompletedTaskByIdController }
