import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetProjectByIdUseCase } from './GetProjectByIdUseCase'

class GetProjectByIdController {
  async handle(request: Request, response: Response) {
    const { projectId } = request.params

    const getProjectUseCase = container.resolve(GetProjectByIdUseCase)

    const project = await getProjectUseCase.execute(projectId)

    return response.json(project)
  }
}

export { GetProjectByIdController }
