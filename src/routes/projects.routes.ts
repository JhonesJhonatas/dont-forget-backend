import { Router } from 'express'
import { CreateProjectController } from '../modules/projects/useCases/CreateProjectController'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'

const projectRoutes = Router()

const createProjectController = new CreateProjectController()

projectRoutes.post(
  '/create-project',
  ensureAuthenticated,
  createProjectController.handle,
)

export { projectRoutes }
