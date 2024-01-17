import { inject, injectable } from 'tsyringe'
import { INotificationsRepository } from '../../repositories/INotificationsRepository'

@injectable()
class DeleteNotificationUseCase {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute(id: string) {
    await this.notificationsRepository.delete(id)
  }
}

export { DeleteNotificationUseCase }
