import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../../tasks/repositories/ITasksRepository'

@injectable()
class GetProjectProgressUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(projectId: string) {
    const [openedTasks, concludedTasks] = await Promise.all([
      this.tasksRepository.findOpenedTasksByProjectId(projectId),
      this.tasksRepository.findConcludedTasksByProjectId(projectId),
    ])

    const countAllTasks = openedTasks.length + concludedTasks.length

    const countProgress = (concludedTasks.length / countAllTasks) * 100

    return countProgress.toFixed(2)
  }
}

export { GetProjectProgressUseCase }
