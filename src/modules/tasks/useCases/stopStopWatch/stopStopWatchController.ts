import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StopStopWatchUseCase } from './stopStopWatchUseCase'

class StopStopWatchController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user
    const { id, taskId, startDate, endDate, isActive } = request.body

    const stopStopWatchUseCase = container.resolve(StopStopWatchUseCase)

    const stopedStopWatch = await stopStopWatchUseCase.execute({
      id,
      userId,
      taskId,
      startDate,
      endDate,
      isActive,
    })

    return response.status(201).json(stopedStopWatch)
  }
}

export { StopStopWatchController }
