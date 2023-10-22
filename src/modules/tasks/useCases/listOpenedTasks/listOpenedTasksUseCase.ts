import { inject, injectable } from 'tsyringe'

@injectable()
class ListOpenedTasksUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(projectId: string) {
    const openedTasks =
      await this.tasksRepository.findOpenedTasksByProjectId(projectId)

    return openedTasks
  }
}

export { ListOpenedTasksUseCase }
