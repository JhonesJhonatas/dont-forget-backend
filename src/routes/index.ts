import { Router } from 'express'
import { taskRoutes } from './tasks.routes'
import { userRoutes } from './users.routes'

const router = Router()

router.use('/users', userRoutes)
router.use('/tasks', taskRoutes)

export { router }
