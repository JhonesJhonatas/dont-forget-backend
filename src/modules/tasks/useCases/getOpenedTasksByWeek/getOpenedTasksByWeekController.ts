import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetOpenedTasksByWeekUseCase } from './getOpenedTasksByWeekUseCase'

class GetOpenedTasksByWeekController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user
    const { startDate, endDate } = request.query

    const getOpenedTasksByWeekUseCase = container.resolve(
      GetOpenedTasksByWeekUseCase,
    )

    const formattedStartDate = new Date(startDate as string)
    const formattedEndDate = new Date(endDate as string)

    const tasksOfWeek = await getOpenedTasksByWeekUseCase.execute({
      userId,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    })

    return response.status(201).json(tasksOfWeek)
  }
}

export { GetOpenedTasksByWeekController }
