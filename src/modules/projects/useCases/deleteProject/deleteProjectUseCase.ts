import { inject, injectable } from 'tsyringe'
import { IDeletProjectDTO } from '../../dtos/IDeleteTaskDTO'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class DeleteProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute({ projectId, userId }: IDeletProjectDTO) {
    const userProjects = await this.projectsRepository.listProjects(userId)

    const isProjectOwner = userProjects.some(
      (project) => project.id === projectId,
    )

    if (!isProjectOwner) {
      throw new AppError('Usuário não é proprietário do projeto', 401)
    }

    const deletedProject = await this.projectsRepository.deletProject(projectId)

    return deletedProject
  }
}

export { DeleteProjectUseCase }
