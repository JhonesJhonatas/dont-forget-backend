import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'
import { IProjectsRepository } from '../../../projects/repositories/IProjectsRepository'
import { ICreateUserWithProject } from '../../dtos/ICreateUserWithProject'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute({
    name,
    email,
    role,
    birthDate,
    password,
    projectName,
    projectColor,
    projectDescription,
  }: ICreateUserWithProject) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists!', 400)
    }

    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      birthDate,
      password: passwordHash,
      role,
    })

    if (user) {
      await this.projectsRepository.create({
        color: projectColor,
        description: projectDescription,
        title: projectName,
        userId: user.id,
      })
    }

    return user
  }
}

export { CreateUserUseCase }
