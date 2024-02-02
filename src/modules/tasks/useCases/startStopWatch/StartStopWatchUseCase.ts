import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { IStartStopWatchDTO } from '../../dtos/IStartStopWatchDTO'

@injectable()
class StartStopWatchUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({ taskId, startDate, isActive }: IStartStopWatchDTO) {
    const notificationBody = { taskId, startDate, isActive }

    const startedStopWatch =
      await this.tasksRepository.startStopWatch(notificationBody)

    return startedStopWatch
  }
}

export { StartStopWatchUseCase }
