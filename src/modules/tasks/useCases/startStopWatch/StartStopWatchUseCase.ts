import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { IStartStopWatchDTO } from '../../dtos/IStartStopWatchDTO'

@injectable()
class StartStopWatchUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({ userId, taskId, startDate, isActive }: IStartStopWatchDTO) {
    const notificationBody = { taskId, startDate, isActive }

    const openedTasks = await this.tasksRepository.findOpenedTasksByUserId(
      userId as string,
    )

    for (const openedTask of openedTasks) {
      const stopWatchsList = await this.tasksRepository.getStopWatchesByTaskId(
        openedTask.id,
      )

      if (stopWatchsList) {
        await Promise.all(
          stopWatchsList.map(async (stopWatch) => {
            if (stopWatch.isActive) {
              await this.tasksRepository.editStopWatch({
                id: stopWatch._id.toString(),
                taskId: stopWatch.taskId,
                startDate: stopWatch.startDate,
                endDate: new Date(),
                isActive: false,
              })
            }
          }),
        )
      }
    }

    const startedStopWatch =
      await this.tasksRepository.startStopWatch(notificationBody)

    return startedStopWatch
  }
}

export { StartStopWatchUseCase }
