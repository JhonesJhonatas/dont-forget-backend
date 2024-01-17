import { Router } from 'express'
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated'
import { CreateNotificationController } from '../modules/notifications/useCases/createNotification/createNotificationController'
import { GetNotificationsController } from '../modules/notifications/useCases/getNotifications/getNotificationsController'
import { DeleteNotificationController } from '../modules/notifications/useCases/deleteNotification/deleteNotificationController'

const createNotificationController = new CreateNotificationController()
const getNotificationsController = new GetNotificationsController()
const deleteNotificationController = new DeleteNotificationController()

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

notificationsRoutes.delete(
  '/delete-notification',
  ensureAuthenticated,
  deleteNotificationController.handle,
)

export { notificationsRoutes }
