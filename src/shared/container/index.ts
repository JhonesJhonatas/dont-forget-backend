import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { UserRepository } from '../../modules/users/repositories/implementations/UserRepository'
import { IProjectsRepository } from '../../modules/projects/repositories/IProjectsRepository'
import { ProjectsRepository } from '../../modules/projects/repositories/implementations/ProjectsRepository'
import { ITasksRepository } from '../../modules/tasks/repositories/ITasksRepository'
import { TaskRepository } from '../../modules/tasks/repositories/implementations/TaskRepository'
import { INotificationsRepository } from '../../modules/notifications/repositories/INotificationsRepository'
import { NotificationsRepository } from '../../modules/notifications/repositories/implementations/NotificationsRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
)

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository)

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
)

container.registerSingleton<ITasksRepository>('TasksRepository', TaskRepository)
