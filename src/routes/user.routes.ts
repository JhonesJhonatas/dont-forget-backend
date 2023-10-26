import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/CreateUserController'
import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController'

const userRoutes = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

userRoutes.post('/create-user', createUserController.handle)
userRoutes.post('/session', authenticateUserController.handle)

export { userRoutes }
