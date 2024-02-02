import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteStopWatchUseCase } from './deleteStopWatchUseCase'

class DeleteStopWatchController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteStopWatchUseCase = container.resolve(DeleteStopWatchUseCase)

    const deletedStopWatch = await deleteStopWatchUseCase.execute(id)

    return response.status(201).json(deletedStopWatch)
  }
}

export { DeleteStopWatchController }
