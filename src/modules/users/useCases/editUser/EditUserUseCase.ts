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
    const [oldUserData, sentVerificationCodeData] = await Promise.all([
      this.usersRepository.findById(id),
      this.usersRepository.getEmailVerificationByUserId(id),
    ])

    const todayDate = new Date()

    todayDate.setHours(0, 0, 0, 0)

    if (oldUserData.email !== email && sentVerificationCodeData) {
      await this.usersRepository.deleteEmailVerificationInformation(
        sentVerificationCodeData._id.toString(),
      )
    }

    const needNewEmailConfirmation = oldUserData.email !== email

    const updatedUser = await this.usersRepository.edit({
      ...oldUserData,
      id,
      name,
      email,
      role,
      birthDate,
      updated_at: todayDate,
      confirmedEmail: !needNewEmailConfirmation,
    })

    return updatedUser
  }
}

export { EditUseUseCase }
