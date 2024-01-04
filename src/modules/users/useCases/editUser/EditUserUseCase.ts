import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IEditUserDTO } from '../../dtos/IEditUserDTO'

@injectable()
class EditUseUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id, name, email, birthDate, role }: IEditUserDTO) {
    const updatedUser = await this.usersRepository.edit({
      id,
      name,
      email,
      role,
      birthDate,
    })

    return updatedUser
  }
}

export { EditUseUseCase }
