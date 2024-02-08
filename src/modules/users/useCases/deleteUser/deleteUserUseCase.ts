import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'
import { ITasksRepository } from '../../../tasks/repositories/ITasksRepository'

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(userId: string) {
    const [userToDelete, stopWatches] = await Promise.all([
      this.usersRepository.findById(userId),
      this.tasksRepository.getStopWatchesByUserId(userId),
    ])

    if (!userToDelete) {
      throw new AppError('User Not Found', 404)
    }

    if (stopWatches) {
      for (const stopWatch of stopWatches) {
        await this.tasksRepository.deleteStopWatch(stopWatch._id.toString())
      }
    }

    const deletedUser = await this.usersRepository.delete(userId)

    return deletedUser
  }
}

export { DeleteUserUseCase }
