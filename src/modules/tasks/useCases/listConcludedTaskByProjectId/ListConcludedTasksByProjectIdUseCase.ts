import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { IProjectsRepository } from '../../../projects/repositories/IProjectsRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class ListConcludedTasksByProjectIdUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(userId: string, projectId: string) {
    const listOfProjects = await this.projectsRepository.listProjects(userId)

    const projectExists = listOfProjects.some(
      (project) => project.id === projectId,
    )

    if (!projectExists) {
      throw new AppError('O projeto informado não existe', 400)
    }

    const tasksList =
      await this.tasksRepository.findConcludedTasksByProjectId(projectId)

    return tasksList
  }
}

export { ListConcludedTasksByProjectIdUseCase }
