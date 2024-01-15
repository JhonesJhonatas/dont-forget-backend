import { Request, Response } from 'express'
import { CreateNotificationUseCase } from './createNotificationUseCase'
import { container } from 'tsyringe'

class CreateNotificationController {
  async handle(request: Request, response: Response) {
    const { id } = request.user
    const { type, title, description, read } = request.body

    const createNotificationUseCase = container.resolve(
      CreateNotificationUseCase,
    )

    const notification = await createNotificationUseCase.execute({
      userId: id,
      type,
      title,
      description,
      read,
    })

    return response.status(201).json(notification)
  }
}

export { CreateNotificationController }
