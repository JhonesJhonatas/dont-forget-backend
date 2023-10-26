import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { IProjectsRepository } from '../../../projects/repositories/IProjectsRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class ListOpenedTasksUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(projectId: string, userId: string) {
    const listOfProjects = await this.projectsRepository.listProjects(userId)

    const theProjectExists = listOfProjects.some(
      (project) => project.id === projectId,
    )

    if (!theProjectExists) {
      throw new AppError('Projeto informado não existe', 401)
    }

    const openedTasks =
      await this.tasksRepository.findOpenedTasksByProjectId(projectId)

    return openedTasks
  }
}

export { ListOpenedTasksUseCase }
