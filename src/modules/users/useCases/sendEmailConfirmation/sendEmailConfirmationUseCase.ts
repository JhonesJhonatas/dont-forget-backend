import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'
import { createTransport } from 'nodemailer'

@injectable()
class SendEmailConfirmationUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  private generateRandonCode() {
    let genereatedCode = ''
    for (let i = 0; i < 6; i++) {
      genereatedCode += Math.floor(Math.random() * 10)
      if (i === 2) genereatedCode += ' '
    }
    return genereatedCode
  }

  async execute(userId: string) {
    const userCompleteData = await this.usersRepository.findById(userId)

    const isEmailConfirmed = userCompleteData.confirmedEmail

    if (isEmailConfirmed) {
      throw new AppError('Email already confirmed', 400)
    }

    const verificationCodeAlreadySent =
      await this.usersRepository.getEmailVerificationByUserId(
        userCompleteData.id,
      )

    if (verificationCodeAlreadySent) {
      throw new AppError('Email verification already sent', 400)
    }

    const generatedCode = this.generateRandonCode()

    const transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ACESS,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_ACESS,
      to: userCompleteData.email,
      subject: 'Verificação de Email',
      text: generatedCode,
    }

    try {
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          return console.log(error)
        }

        await this.usersRepository.createEmailVerification({
          userId: userCompleteData.id,
          code: generatedCode,
          created_at: new Date(),
        })

        console.log('E-mail enviado: ' + info.response)
      })
    } catch (err) {
      throw new AppError('Email Not Sent, Unknow Error.', 400)
    }
  }
}

export { SendEmailConfirmationUseCase }
