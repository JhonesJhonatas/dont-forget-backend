import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, name, password, role }: ICreateUserDTO) {
    const user = await this.usersRepository.create({
      name,
      email,
      password,
      role,
    })

    return user
  }
}

export { CreateUserUseCase }
