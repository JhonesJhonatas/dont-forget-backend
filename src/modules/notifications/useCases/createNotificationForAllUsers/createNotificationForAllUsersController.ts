import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNotificationForAllUsersUseCase } from './createNotificationForAllUsersUseCase'

class CreateNotificationForAllUsersController {
  async handle(request: Request, response: Response) {
    const { type, title, description, read } = request.body

    const createNotificationForAllUsersUseCase = container.resolve(
      CreateNotificationForAllUsersUseCase,
    )

    const createdNotifications =
      await createNotificationForAllUsersUseCase.execute({
        type,
        title,
        description,
        read,
      })

    return response.status(201).json(createdNotifications)
  }
}

export { CreateNotificationForAllUsersController }
