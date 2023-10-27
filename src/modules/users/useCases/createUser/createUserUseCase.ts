import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, name, password, role }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists!', 400)
    }

    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      role,
    })

    return user
  }
}

export { CreateUserUseCase }
