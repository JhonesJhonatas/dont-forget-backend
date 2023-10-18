import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { UserRepository } from '../../modules/users/repositories/implementations/UserRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository)
