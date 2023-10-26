import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { IProjectsRepository } from '../../../projects/repositories/IProjectsRepository'
import { Project } from '@prisma/client'
import { AppError } from '../../../../errors/AppError'
import { ICreateConcludedTaskParamsDTO } from '../../../projects/dtos/ICreatedConcludedTaskParamsDTO'

@injectable()
class ConcludeTaskByIdUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({
    createdAt,
    description,
    maturity,
    priority,
    projectId,
    title,
    userId,
    status,
    taskId,
  }: ICreateConcludedTaskParamsDTO) {
    const listOfProjects: Project[] = []

    if (userId) {
      const projects = await this.projectsRepository.listProjects(userId)

      listOfProjects.push(...projects)
    }

    const theProjectExists = listOfProjects.some(
      (project) => project.id === projectId,
    )

    if (!theProjectExists) {
      throw new AppError('Projeto não encontrado', 401)
    }

    const project = listOfProjects.filter((project) => project.id === projectId)
    const isOwnerOfProject = project.some(
      (project) => project.userId === userId,
    )

    if (!isOwnerOfProject) {
      throw new AppError('Usuário não é proprietário do projeto', 401)
    }

    const task = await this.tasksRepository.createConcludedTask({
      createdAt,
      description,
      maturity,
      priority,
      projectId,
      title,
      userId,
      status,
    })

    if (task) {
      await this.tasksRepository.deleteOpenedTaskById(taskId)
    }

    return task
  }
}

export { ConcludeTaskByIdUseCase }
