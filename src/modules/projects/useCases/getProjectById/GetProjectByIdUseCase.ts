import { inject, injectable } from 'tsyringe'
import { IProjectsRepository } from '../../repositories/IProjectsRepository'

@injectable()
class GetProjectByIdUseCase {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(projectId: string) {
    const project = await this.projectsRepository.getProjectById(projectId)

    return project
  }
}

export { GetProjectByIdUseCase }
