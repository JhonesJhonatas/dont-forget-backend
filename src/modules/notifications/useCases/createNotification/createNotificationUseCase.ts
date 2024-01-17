import { inject, injectable } from 'tsyringe'
import { ICreateNotificationDTO } from '../../dtos/ICreateNotificationDTO'
import { INotificationsRepository } from '../../repositories/INotificationsRepository'

@injectable()
class CreateNotificationUseCase {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({
    userId,
    type,
    title,
    description,
    read,
  }: ICreateNotificationDTO) {
    const notificationBody = { userId, type, title, description, read }

    const savedNotification =
      await this.notificationsRepository.create(notificationBody)

    return savedNotification
  }
}

export { CreateNotificationUseCase }
