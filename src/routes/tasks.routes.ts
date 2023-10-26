import { Router } from 'express'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { CreateTaskController } from '../modules/tasks/useCases/createTasks/CreateTaskController'
import { EditTaskController } from '../modules/tasks/useCases/editTask/EditTaskController'
import { ListAllOpenedTasksController } from '../modules/tasks/useCases/listOpenedTasks/ListOpenedTaskController'

const taskRoutes = Router()

const createTaskController = new CreateTaskController()
const listOpenedTasksController = new ListAllOpenedTasksController()
const editTasController = new EditTaskController()

taskRoutes.post(
  '/create-task',
  ensureAuthenticated,
  createTaskController.handle,
)

taskRoutes.get(
  '/list-all-opened-tasks',
  ensureAuthenticated,
  listOpenedTasksController.handle,
)

taskRoutes.put(
  '/edit-task-by-id',
  ensureAuthenticated,
  editTasController.handle,
)

export { taskRoutes }
