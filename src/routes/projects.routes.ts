import { Router } from 'express'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { CreateProjectController } from '../modules/projects/useCases/createProjects/CreateProjectController'
import { ListProjectsController } from '../modules/projects/useCases/listProjects/ListProjectsController'

const projectRoutes = Router()

const createProjectController = new CreateProjectController()
const listProjectsController = new ListProjectsController()

projectRoutes.post(
  '/create-project',
  ensureAuthenticated,
  createProjectController.handle,
)

projectRoutes.get(
  '/list-projects',
  ensureAuthenticated,
  listProjectsController.handle,
)

export { projectRoutes }
