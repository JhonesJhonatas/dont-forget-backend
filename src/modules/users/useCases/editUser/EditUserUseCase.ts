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
    const oldUserData = await this.usersRepository.findById(id)

    const todayDate = new Date()

    todayDate.setHours(0, 0, 0, 0)

    const updatedUser = await this.usersRepository.edit({
      ...oldUserData,
      id,
      name,
      email,
      role,
      birthDate,
      updated_at: todayDate,
    })

    return updatedUser
  }
}

export { EditUseUseCase }
