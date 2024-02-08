import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController'
import { EditUserController } from '../modules/users/useCases/editUser/EditUserController'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { GetUserDataController } from '../modules/users/useCases/getUserData/GetUserDataController'
import { EditPasswordController } from '../modules/users/useCases/editPassword/EditPasswordController'
import { RefreshTokenController } from '../modules/users/useCases/refreshToken/refreshTokenController'
import { DeleteUserController } from '../modules/users/useCases/deleteUser/deleteUserController'

const userRoutes = Router()

const createUserController = new CreateUserController()
const getUserDataController = new GetUserDataController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()
const editUserController = new EditUserController()
const editPasswordController = new EditPasswordController()
const deleteUserController = new DeleteUserController()

userRoutes.post('/create-user', createUserController.handle)

userRoutes.get(
  '/get-user-data',
  ensureAuthenticated,
  getUserDataController.handle,
)
userRoutes.post('/session', authenticateUserController.handle)
userRoutes.post('/refresh-token', refreshTokenController.handle)
userRoutes.put('/edit-user', ensureAuthenticated, editUserController.handle)
userRoutes.put(
  '/edit-password',
  ensureAuthenticated,
  editPasswordController.handle,
)
userRoutes.delete(
  '/delete-user',
  ensureAuthenticated,
  deleteUserController.handle,
)

export { userRoutes }
