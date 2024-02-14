import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../errors/AppError'
import { createTransport } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'

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

    const mailOptions: MailOptions = {
      from: process.env.EMAIL_ACESS,
      to: userCompleteData.email,
      subject: 'Verificação de Email',
      html: `
      <div style="width: 100%;">
        <table style="margin: 0 auto; width: 60vw; background-color: #3F3F46; padding: 2rem 1rem; border-radius: 6px; font-family: 'Poppins', sans-serif;">
          <tr>
            <td style="text-align: center; color: #ffffff; font-size: 2rem; font-weight: bold;">Dont Forget</td>
          </tr>
          <tr>
            <td style="text-align: center; color: #ffffff; font-weight:300; font-size: 1.25rem; ">Aqui está o seu código para verificação de email</td>
          </tr>
          <tr>
            <td style="text-align: center; color: #ffffff; font-weight:300; font-size: 1rem; ">Utilize no nosso sistema para validação do seu email</td>
          </tr>
          <tr>
            <td style="text-align: center; background-color: #71717A; padding: 0.5rem; border-radius: 6px; font-size: 2rem; font-weight: bold; color: #ffffff; border: 1px solid #52525B;">${generatedCode}</td>
          </tr>
          <tr>
            <td style="text-align: center; color: #ffffff; font-weight:300; font-size: 1rem; "><a href="www.dontforget.com.br" target="_blank" style="color: #ffffff; text-decoration: none;">www.dontforget.com.br</a></td>
          </tr>
        </table>
      </div>
      `,
    }

    try {
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          return console.log(error)
        }
        console.log('E-mail enviado: ' + info.response)
      })

      await this.usersRepository.createEmailVerification({
        userId: userCompleteData.id,
        code: generatedCode,
        created_at: new Date(),
      })
    } catch (err) {
      throw new AppError('Email Not Sent, Unknow Error.', 400)
    }
  }
}

export { SendEmailConfirmationUseCase }
