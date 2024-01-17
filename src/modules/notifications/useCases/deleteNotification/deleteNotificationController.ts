import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteNotificationUseCase } from './deleteNotificationUseCase'

class DeleteNotificationController {
  async handle(request: Request, response: Response) {
    const { id } = request.body

    const deleteNotificationUseCase = container.resolve(
      DeleteNotificationUseCase,
    )

    const notifications = await deleteNotificationUseCase.execute(id)

    return response.status(201).json(notifications)
  }
}

export { DeleteNotificationController }
