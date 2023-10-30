import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class ListAllConcludedTasksByUserIdUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(userId: string) {
    const tasksList =
      await this.tasksRepository.findConcludedTasksByUserId(userId)

    if (!tasksList) {
      throw new AppError('Usuário não possui tasks concluídas', 400)
    }

    return tasksList
  }
}

export { ListAllConcludedTasksByUserIdUseCase }
