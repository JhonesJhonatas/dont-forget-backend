import { Router } from 'express'
import multer from 'multer'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController'
import { EditUserController } from '../modules/users/useCases/editUser/EditUserController'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { GetUserDataController } from '../modules/users/useCases/getUserData/GetUserDataController'
import { EditPasswordController } from '../modules/users/useCases/editPassword/EditPasswordController'
import { uploadAvatar } from '../shared/middlewares/uploadAvatar'
import { UploadAvatarController } from '../modules/users/useCases/uploadAvatar/UploadAvatarController'

const userRoutes = Router()

const createUserController = new CreateUserController()
const getUserDataController = new GetUserDataController()
const authenticateUserController = new AuthenticateUserController()
const editUserController = new EditUserController()
const editPasswordController = new EditPasswordController()
const uploadAvatarController = new UploadAvatarController()

userRoutes.post('/create-user', createUserController.handle)
userRoutes.post(
  '/upload-avatar',
  multer(uploadAvatar.getConfig).single('avatar'),
  uploadAvatarController.handle,
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
