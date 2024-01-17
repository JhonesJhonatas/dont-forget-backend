import { Router } from 'express'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { CreateNotificationController } from '../modules/notifications/useCases/createNotification/createNotificationController'
import { GetNotificationsController } from '../modules/notifications/useCases/getNotifications/getNotificationsController'

const createNotificationController = new CreateNotificationController()
const getNotificationsController = new GetNotificationsController()

const notificationsRoutes = Router()

notificationsRoutes.post(
  '/create-notification',
  ensureAuthenticated,
  createNotificationController.handle,
)

notificationsRoutes.get(
  '/get-notifications',
  ensureAuthenticated,
  getNotificationsController.handle,
)

export { notificationsRoutes }
