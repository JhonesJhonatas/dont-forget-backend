import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { IStopStopWatchDTO } from '../../dtos/IStopStopWatch'

@injectable()
class StopStopWatchUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({
    id,
    taskId,
    startDate,
    endDate,
    isActive,
  }: IStopStopWatchDTO) {
    const notificationBody = { id, taskId, startDate, endDate, isActive }

    const stopedStopWatch =
      await this.tasksRepository.editStopWatch(notificationBody)

    return stopedStopWatch
  }
}

export { StopStopWatchUseCase }
