import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetStopWatchByTaskIdUseCase } from './getStopWatchByTaskIdUseCase'

class GetStopWatchByTaskIdController {
  async handle(request: Request, response: Response) {
    const { taskId } = request.params

    const startStopWatchByTaskIdUseCase = container.resolve(
      GetStopWatchByTaskIdUseCase,
    )

    const stopWatchList = await startStopWatchByTaskIdUseCase.execute(taskId)

    return response.status(201).json(stopWatchList)
  }
}

export { GetStopWatchByTaskIdController }
