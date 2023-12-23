import { Router } from 'express'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { CreateTaskController } from '../modules/tasks/useCases/createTasks/CreateTaskController'
import { EditTaskController } from '../modules/tasks/useCases/editTask/EditTaskController'
import { ListAllOpenedTasksController } from '../modules/tasks/useCases/listAllTasksByUserId/ListOpenedTaskController'
import { ListOpenedTasksByProjectIdController } from '../modules/tasks/useCases/listOpenedTasksByProjectId/ListOpenedTasksByProjectIdController'
import { DeleteOpenedTasksByIdController } from '../modules/tasks/useCases/deleteOpenedTaskById/DeleteOpenedTaskByIdController'
import { DeleteConcludedTasksByIdController } from '../modules/tasks/useCases/deleteConcludedTaskById/DeleteConcludedTaskByIdController'
import { ConcludeTaskByIdController } from '../modules/tasks/useCases/concludeTaskById/ConcludeTaskByIdController'
import { ListConcludedTasksByProjectIdController } from '../modules/tasks/useCases/listConcludedTaskByProjectId/ListConcludedTasksByProjectIdController'
import { ListAllConcludedTasksByUserIdController } from '../modules/tasks/useCases/listAllConcludedTasksByUserId/ListAllConcludedTasksByUserIdController'
import { UndoCompletedTaskByIdController } from '../modules/tasks/useCases/undoCompletedTaskByProjectId/UndoCompletedTaskByIdController'

const taskRoutes = Router()

const createTaskController = new CreateTaskController()
const listOpenedTasksByUserIdController = new ListAllOpenedTasksController()
const listOpenedTasksByProjectIdController =
  new ListOpenedTasksByProjectIdController()
const listAllConcludedTasksByUserIdController =
  new ListAllConcludedTasksByUserIdController()
const listConcludedTasksByProjectIdController =
  new ListConcludedTasksByProjectIdController()
const editTasController = new EditTaskController()
const deleteOpenedTaskById = new DeleteOpenedTasksByIdController()
const deleteConcludedTaskById = new DeleteConcludedTasksByIdController()
const concludeTaskByIdController = new ConcludeTaskByIdController()
const undoCompledTaskByIdController = new UndoCompletedTaskByIdController()

taskRoutes.post(
  '/create-task',
  ensureAuthenticated,
  createTaskController.handle,
)

taskRoutes.get(
  '/list-all-opened-tasks-by-user-id',
  ensureAuthenticated,
  listOpenedTasksByUserIdController.handle,
)

taskRoutes.get(
  '/list-all-concluded-tasks-by-user-id',
  ensureAuthenticated,
  listAllConcludedTasksByUserIdController.handle,
)

taskRoutes.get(
  '/list-opened-tasks-by-project-id/:projectId',
  ensureAuthenticated,
  listOpenedTasksByProjectIdController.handle,
)

taskRoutes.get(
  '/list-concluded-tasks-by-project-id/:projectId',
  ensureAuthenticated,
  listConcludedTasksByProjectIdController.handle,
)

taskRoutes.put(
  '/edit-task-by-id',
  ensureAuthenticated,
  editTasController.handle,
)

taskRoutes.delete(
  '/delete-opened-task-by-id/:taskId',
  ensureAuthenticated,
  deleteOpenedTaskById.handle,
)

taskRoutes.delete(
  '/delete-concluded-task-by-id/:taskId',
  ensureAuthenticated,
  deleteConcludedTaskById.handle,
)

taskRoutes.post(
  '/conclude-task-by-id',
  ensureAuthenticated,
  concludeTaskByIdController.handle,
)

taskRoutes.post(
  '/undo-concluded-task-by-id',
  ensureAuthenticated,
  undoCompledTaskByIdController.handle,
)

export { taskRoutes }
