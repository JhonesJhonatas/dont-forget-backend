import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { AppError } from '../../../errors/AppError'

@injectable()
class UsersJobs {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async deleteInactiveUsers() {
    const inactiveUsers = await this.usersRepository.getInactiveUsers()

    if (!inactiveUsers) {
      throw new AppError('No Inactive Users')
    }

    inactiveUsers.forEach(async (user) => {
      await this.usersRepository.delete(user.id)
    })
  }
}

export { UsersJobs }
