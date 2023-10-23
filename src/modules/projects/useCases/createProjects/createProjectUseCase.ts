import { inject, injectable } from 'tsyringe'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'
import { ICreatedProjectDTO } from '../../dtos/ICreateProjectDTO'

@injectable()
class CreateProjectUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute({
    color,
    createdAt,
    description,
    title,
    userId,
  }: ICreatedProjectDTO) {
    const projects = await this.projectsRepository.create({
      color,
      createdAt,
      description,
      title,
      userId,
    })

    return projects
  }
}

export { CreateProjectUseCase }
