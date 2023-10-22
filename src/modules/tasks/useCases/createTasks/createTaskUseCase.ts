import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO'

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({
    createdAt,
    description,
    maturity,
    priority,
    projectId,
    status,
    title,
  }: ICreateTaskDTO) {
    const task = await this.tasksRepository.create({
      createdAt,
      description,
      maturity,
      priority,
      projectId,
      status,
      title,
    })

    return task
  }
}

export { CreateTaskUseCase }
