import { container } from 'tsyringe'
import { GetProjectProgressUseCase } from './GetProjectProgressUseCase'
import { Request, Response } from 'express'

class GetProjectProgressController {
  async handle(request: Request, response: Response) {
    const { projectId } = request.params

    const getProjectProgressUseCase = container.resolve(
      GetProjectProgressUseCase,
    )

    const projectProgress = await getProjectProgressUseCase.execute(projectId)

    return response.json(projectProgress)
  }
}

export { GetProjectProgressController }
