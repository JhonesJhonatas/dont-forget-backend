import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'

@injectable()
class GetStopWatchByTaskIdUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(taskId: string) {
    const stopWatchList =
      await this.tasksRepository.getStopWatchesByTaskId(taskId)

    return stopWatchList
  }
}

export { GetStopWatchByTaskIdUseCase }
