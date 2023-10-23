import { inject, injectable } from 'tsyringe'
import { IEditProjectDTO } from '../../dtos/IEditProjectDTO'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'

@injectable()
class EditProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute({ color, description, id, title }: IEditProjectDTO) {
    const project = await this.projectsRepository.editProject({
      color,
      description,
      id,
      title,
    })

    return project
  }
}

export { EditProjectUseCase }
