import { inject, injectable } from 'tsyringe'
import { IEditProjectDTO } from '../../dtos/IEditProjectDTO'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class EditProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute({ color, description, id, title, userId }: IEditProjectDTO) {
    const userProjects = await this.projectsRepository.listProjects(userId)

    const isProjectOwner = userProjects.some((project) => project.id === id)

    if (!isProjectOwner) {
      throw new AppError('Usuário não é proprietário do projeto!', 401)
    }

    const project = await this.projectsRepository.editProject({
      color,
      description,
      id,
      title,
      userId,
    })

    return project
  }
}

export { EditProjectUseCase }
