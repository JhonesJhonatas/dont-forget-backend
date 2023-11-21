import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './createUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, role, title, description, color } =
      request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute({
      email,
      name,
      password,
      role,
      title,
      description,
      color,
    })

    return response.status(201).json(user)
  }
}

export { CreateUserController }
