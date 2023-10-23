import { Router } from 'express'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { CreateProjectController } from '../modules/projects/useCases/createProjects/CreateProjectController'
import { ListOpenedTasksController } from '../modules/tasks/useCases/listOpenedTasks/ListOpenedTaskController'

const projectRoutes = Router()

const createProjectController = new CreateProjectController()
const listProjectsController = new ListOpenedTasksController()

projectRoutes.post(
  '/create-project',
  ensureAuthenticated,
  createProjectController.handle,
)

projectRoutes.get(
  '/list-projects-by-user-id/:userId',
  ensureAuthenticated,
  listProjectsController.handle,
)

export { projectRoutes }
