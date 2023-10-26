import { Request, Response } from 'express'
import { DeleteProjectUseCase } from './deleteProjectUseCase'
import { container } from 'tsyringe'

class DeleteProjectController {
  async handle(request: Request, response: Response) {
    const { projectId } = request.params
    const { id: userId } = request.user

    const deleteProjectUseCase = container.resolve(DeleteProjectUseCase)

    const project = await deleteProjectUseCase.execute({ projectId, userId })

    return response.status(200).json(project)
  }
}

export { DeleteProjectController }
