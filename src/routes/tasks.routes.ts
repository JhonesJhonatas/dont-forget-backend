import { Router } from 'express'
import { CreateTaskController } from '../modules/tasks/useCases/CreateTaskController'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'

const taskRoutes = Router()

const createTaskController = new CreateTaskController()

taskRoutes.post(
  '/create-task',
  ensureAuthenticated,
  createTaskController.handle,
)

export { taskRoutes }
