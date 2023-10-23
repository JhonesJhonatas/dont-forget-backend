import { Router } from 'express'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { ListOpenedTasksController } from '../modules/tasks/useCases/listOpenedTasks/ListOpenedTaskController'
import { CreateTaskController } from '../modules/tasks/useCases/createTasks/CreateTaskController'
import { EditTaskController } from '../modules/tasks/useCases/editTask/EditTaskController'

const taskRoutes = Router()

const createTaskController = new CreateTaskController()
const listOpenedTasksController = new ListOpenedTasksController()
const editTasController = new EditTaskController()

taskRoutes.post(
  '/create-task',
  ensureAuthenticated,
  createTaskController.handle,
)

taskRoutes.get(
  '/list-opened-tasks/:projectId',
  ensureAuthenticated,
  listOpenedTasksController.handle,
)

taskRoutes.put(
  '/edit-task-by-id',
  ensureAuthenticated,
  editTasController.handle,
)

export { taskRoutes }
