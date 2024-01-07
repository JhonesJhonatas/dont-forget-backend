import { Request, Response } from 'express'
import { AppError } from '../../../../errors/AppError'

class UploadAvatarController {
  async handle(request: Request, response: Response) {
    const fileExists = !!request.file

    if (!fileExists) {
      throw new AppError('Allowed only JPEG/PNG', 409)
    }

    return response.status(200).send({
      response: request.file,
    })
  }
}

export { UploadAvatarController }
