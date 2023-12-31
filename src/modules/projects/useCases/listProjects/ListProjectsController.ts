import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListProjectsUseCase } from './listProjectsUseCase'

class ListProjectsController {
  async handle(request: Request, response: Response) {
    const { id: userId } = request.user

    const listProjects = container.resolve(ListProjectsUseCase)

    const projects = await listProjects.execute(userId)

    return response.json(projects)
  }
}

export { ListProjectsController }
