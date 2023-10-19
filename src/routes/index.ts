import { Router } from 'express'
import { userRoutes } from './user.routes'
import { projectRoutes } from './projects.routes'

const routes = Router()

routes.use('/users', userRoutes)

routes.use('/projects', projectRoutes)

export { routes }
