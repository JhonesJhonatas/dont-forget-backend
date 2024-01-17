import { NotificationModel } from '../../../../mongo/mongoModels'
import {
  GetNotificationsSchema,
  NotificationSchema,
} from '../../../../mongo/schemaTypes'
import { ICreateNotificationDTO } from '../../dtos/ICreateNotificationDTO'
import { INotificationsRepository } from '../INotificationsRepository'

class NotificationsRepository implements INotificationsRepository {
  async create({
    userId,
    type,
    title,
    description,
    read,
  }: ICreateNotificationDTO): Promise<NotificationSchema> {
    const notificationBody = { userId, type, title, description, read }

    const notificationsModel = new NotificationModel(notificationBody)

    const savedNotification = await notificationsModel.save()

    return savedNotification
  }

  async getNotifications(userId: string): Promise<GetNotificationsSchema[]> {
    const notifications = await NotificationModel.find({ userId })

    return notifications
  }
}

export { NotificationsRepository }
