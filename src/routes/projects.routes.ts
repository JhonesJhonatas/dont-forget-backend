import { Router } from 'express'
import { CreateProjectController } from '../modules/projects/useCases/CreateProjectController'

const projectRoutes = Router()

const createProjectController = new CreateProjectController()

projectRoutes.use('/create-project', createProjectController.handle)

export { projectRoutes }
