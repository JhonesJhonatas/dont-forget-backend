import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { IEditTaskDTO } from '../../dtos/IEditTaskDTO'

@injectable()
class EditTaskUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({
    description,
    maturity,
    priority,
    projectId,
    status,
    title,
    id,
  }: IEditTaskDTO) {
    const task = await this.tasksRepository.editTaskById({
      description,
      maturity,
      priority,
      projectId,
      status,
      title,
      id,
    })

    return task
  }
}

export { EditTaskUseCase }
