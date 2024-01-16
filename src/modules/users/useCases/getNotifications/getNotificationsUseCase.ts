import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
class GetNotificationUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string) {
    const notifications = await this.usersRepository.getNotifications(userId)

    return notifications
  }
}

export { GetNotificationUseCase }
