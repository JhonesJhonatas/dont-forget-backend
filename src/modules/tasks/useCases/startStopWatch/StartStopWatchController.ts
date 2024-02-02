import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StartStopWatchUseCase } from './StartStopWatchUseCase'

class StartStopWatchController {
  async handle(request: Request, response: Response) {
    const { taskId, startDate, isActive } = request.body

    const startStopWatchUseCase = container.resolve(StartStopWatchUseCase)

    const stardedStopWatch = await startStopWatchUseCase.execute({
      taskId,
      startDate,
      isActive,
    })

    return response.status(201).json(stardedStopWatch)
  }
}

export { StartStopWatchController }
