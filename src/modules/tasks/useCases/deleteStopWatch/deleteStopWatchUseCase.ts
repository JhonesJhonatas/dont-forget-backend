import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'

@injectable()
class DeleteStopWatchUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(id: string) {
    const deletedStopWatch = await this.tasksRepository.deleteStopWatch(id)

    return deletedStopWatch
  }
}

export { DeleteStopWatchUseCase }
