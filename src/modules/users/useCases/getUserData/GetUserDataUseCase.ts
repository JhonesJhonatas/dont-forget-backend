import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
class GetUserDataUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id)

    return user
  }
}

export { GetUserDataUseCase }
