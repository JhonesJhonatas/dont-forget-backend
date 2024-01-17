import { inject, injectable } from 'tsyringe'
import { INotificationsRepository } from '../../repositories/INotificationsRepository'
@injectable()
class GetNotificationUseCase {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute(userId: string) {
    const notifications =
      await this.notificationsRepository.getNotifications(userId)

    return notifications
  }
}

export { GetNotificationUseCase }
