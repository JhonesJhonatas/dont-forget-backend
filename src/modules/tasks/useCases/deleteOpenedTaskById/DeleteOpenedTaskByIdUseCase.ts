import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class DeleteOpenedTaskByIdUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(taskId: string, userId: string) {
    const tasksList = await this.tasksRepository.findOpenedTasksByUserId(userId)

    const taskExists = tasksList.some((task) => task.id === taskId)

    if (!taskExists) {
      throw new AppError('Task Inexistente', 400)
    }

    const deletedTask = await this.tasksRepository.deleteOpenedTaskById(taskId)

    await this.tasksRepository.deleteStopWatchesByTaskId(taskId)

    return deletedTask
  }
}

export { DeleteOpenedTaskByIdUseCase }
