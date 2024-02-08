import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string) {
    const userToDelete = await this.usersRepository.findById(userId)

    if (!userToDelete) {
      throw new AppError('User Not Found', 404)
    }

    const deletedUser = await this.usersRepository.delete(userId)

    return deletedUser
  }
}

export { DeleteUserUseCase }
