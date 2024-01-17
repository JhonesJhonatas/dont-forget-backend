import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetNotificationUseCase } from './getNotificationsUseCase'

class GetNotificationsController {
  async handle(request: Request, response: Response) {
    const { id } = request.user

    const getNotificationsUseCase = container.resolve(GetNotificationUseCase)

    const notifications = await getNotificationsUseCase.execute(id)

    return response.status(201).json(notifications)
  }
}

export { GetNotificationsController }
