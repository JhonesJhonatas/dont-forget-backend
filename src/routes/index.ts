import { Router } from 'express'
import { userRoutes } from './user.routes'
import { projectRoutes } from './projects.routes'
import { taskRoutes } from './tasks.routes'
import { notificationsRoutes } from './notifications.routes'

const routes = Router()

routes.use('/users', userRoutes)

routes.use('/notifications', notificationsRoutes)

routes.use('/projects', projectRoutes)

routes.use('/tasks', taskRoutes)

export { routes }
