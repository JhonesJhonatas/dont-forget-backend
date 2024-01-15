import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateNotificationDTO } from '../../dtos/ICreateNotificationDTO'

@injectable()
class CreateNotificationUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
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
      await this.usersRepository.createNotification(notificationBody)

    return savedNotification
  }
}

export { CreateNotificationUseCase }
