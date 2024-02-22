import { Router } from 'express'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { CreateProjectController } from '../modules/projects/useCases/createProjects/CreateProjectController'
import { ListProjectsController } from '../modules/projects/useCases/listProjects/ListProjectsController'
import { EditProjectController } from '../modules/projects/useCases/editProject/EditProjectController'
import { DeleteProjectController } from '../modules/projects/useCases/deleteProject/DeleteProjectController'
import { GetProjectByIdController } from '../modules/projects/useCases/getProjectById/GetProjectByIdController'
import { GetProjectProgressController } from '../modules/projects/useCases/getProjectProgress/GetProjectProgressController'

const projectRoutes = Router()

const createProjectController = new CreateProjectController()
const listProjectsController = new ListProjectsController()
const getProjectByIdController = new GetProjectByIdController()
const editProjectController = new EditProjectController()
const deleteProjectController = new DeleteProjectController()
const getProjectProgressController = new GetProjectProgressController()

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

projectRoutes.get(
  '/get-project-by-id/:projectId',
  ensureAuthenticated,
  getProjectByIdController.handle,
)

projectRoutes.get(
  '/get-project-progress/:projectId',
  ensureAuthenticated,
  getProjectProgressController.handle,
)

projectRoutes.put(
  '/edit-project',
  ensureAuthenticated,
  editProjectController.handle,
)

projectRoutes.delete(
  '/delete-project/:projectId',
  ensureAuthenticated,
  deleteProjectController.handle,
)

export { projectRoutes }
