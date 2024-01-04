import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IEditPasswordDTO } from '../../dtos/IEditPasswordDTO'
import { compare, hash } from 'bcrypt'
import { AppError } from '../../../../errors/AppError'

@injectable()
class EditPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id, oldPassword, password }: IEditPasswordDTO) {
    const newPasswordHash = await hash(password, 8)

    const user = await this.usersRepository.findById(id)

    const oldPasswordMatch = await compare(oldPassword, user.password)

    if (!oldPasswordMatch) {
      throw new AppError('Senhas não coincidem')
    }

    const updatedUser = await this.usersRepository.editPassword({
      id,
      oldPassword,
      password: newPasswordHash,
    })

    return updatedUser
  }
}

export { EditPasswordUseCase }
