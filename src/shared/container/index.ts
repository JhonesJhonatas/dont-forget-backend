import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { UserRepository } from '../../modules/users/repositories/implementations/UserRepository'
import { IProjectsRepository } from '../../modules/projects/repositories/IProjectsRepository'
import { ProjectsRepository } from '../../modules/projects/repositories/implementations/ProjectsRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository)

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
)
