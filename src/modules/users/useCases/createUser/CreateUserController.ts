import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './createUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      email,
      role,
      birthDate,
      password,
      projectName,
      projectColor,
      projectDescription,
    } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute({
      name,
      email,
      role,
      birthDate,
      password,
      projectName,
      projectColor,
      projectDescription,
    })

    return response.status(201).json(user)
  }
}

export { CreateUserController }
