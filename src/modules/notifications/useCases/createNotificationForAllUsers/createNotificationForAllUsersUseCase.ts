import { inject, injectable } from 'tsyringe'
import { ICreateNotificationDTO } from '../../dtos/ICreateNotificationDTO'
import { INotificationsRepository } from '../../repositories/INotificationsRepository'
import { IUsersRepository } from '../../../users/repositories/IUsersRepository'

@injectable()
class CreateNotificationForAllUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({ type, title, description, read }: ICreateNotificationDTO) {
    const notificationBody = { type, title, description, read }

    const allUsers = await this.usersRepository.getAllUsers()

    const createdNotifications = await Promise.all(
      allUsers.map(async (user) => {
        const createdNotification = await this.notificationsRepository.create({
          userId: user.id,
          ...notificationBody,
        })
        return createdNotification
      }),
    )

    return createdNotifications
  }
}

export { CreateNotificationForAllUsersUseCase }
