import { Router } from 'express'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { ListOpenedTasksController } from '../modules/tasks/useCases/listOpenedTasks/ListOpenedTaskController'
import { CreateTaskController } from '../modules/tasks/useCases/createTasks/CreateTaskController'

const taskRoutes = Router()

const createTaskController = new CreateTaskController()
const listOpenedTasksController = new ListOpenedTasksController()

taskRoutes.post(
  '/create-task',
  ensureAuthenticated,
  createTaskController.handle,
)

taskRoutes.get(
  '/list-opened-tasks/:projectId',
  listOpenedTasksController.handle,
)

export { taskRoutes }
