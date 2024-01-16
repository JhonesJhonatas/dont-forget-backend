import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController'
import { EditUserController } from '../modules/users/useCases/editUser/EditUserController'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { GetUserDataController } from '../modules/users/useCases/getUserData/GetUserDataController'
import { EditPasswordController } from '../modules/users/useCases/editPassword/EditPasswordController'
import { CreateNotificationController } from '../modules/users/useCases/createNotification/createNotificationController'
import { GetNotificationsController } from '../modules/users/useCases/getNotifications/getNotificationsController'

const userRoutes = Router()

const createUserController = new CreateUserController()
const getUserDataController = new GetUserDataController()
const authenticateUserController = new AuthenticateUserController()
const editUserController = new EditUserController()
const editPasswordController = new EditPasswordController()
const createNotificationController = new CreateNotificationController()
const getNotificationsController = new GetNotificationsController()

userRoutes.post('/create-user', createUserController.handle)
userRoutes.post(
  '/create-notification',
  ensureAuthenticated,
  createNotificationController.handle,
)
userRoutes.get(
  '/get-notifications',
  ensureAuthenticated,
  getNotificationsController.handle,
)
userRoutes.get(
  '/get-user-data',
  ensureAuthenticated,
  getUserDataController.handle,
)
userRoutes.post('/session', authenticateUserController.handle)
userRoutes.put('/edit-user', ensureAuthenticated, editUserController.handle)
userRoutes.put(
  '/edit-password',
  ensureAuthenticated,
  editPasswordController.handle,
)

export { userRoutes }
