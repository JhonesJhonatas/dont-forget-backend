import { Router } from 'express'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { CreateProjectController } from '../modules/projects/useCases/createProjects/CreateProjectController'
import { ListProjectsController } from '../modules/projects/useCases/listProjects/ListProjectsController'
import { EditProjectController } from '../modules/projects/useCases/editProject/EditProjectController'

const projectRoutes = Router()

const createProjectController = new CreateProjectController()
const listProjectsController = new ListProjectsController()
const editProjectController = new EditProjectController()

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

projectRoutes.put(
  '/edit-project-by-id',
  ensureAuthenticated,
  editProjectController.handle,
)

export { projectRoutes }
