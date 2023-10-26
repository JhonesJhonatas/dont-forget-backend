import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { UserRepository } from '../../modules/users/repositories/implementations/UserRepository'
import { IProjectsRepository } from '../../modules/projects/repositories/IProjectsRepository'
import { ProjectsRepository } from '../../modules/projects/repositories/implementations/ProjectsRepository'
import { ITasksRepository } from '../../modules/tasks/repositories/ITasksRepository'
import { TaskRepository } from '../../modules/tasks/repositories/implementations/TaskRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository)

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
)

container.registerSingleton<ITasksRepository>('TasksRepository', TaskRepository)
