import { inject, injectable } from 'tsyringe'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'

@injectable()
class ListProjectsUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(userId: string) {
    const projects = await this.projectsRepository.listProjects(userId)

    return projects
  }
}

export { ListProjectsUseCase }
