import {
  GetNotificationsSchema,
  NotificationSchema,
} from '../../../mongo/notifications/types/notificationsTypes'
import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO'

interface INotificationsRepository {
  create({
    type,
    title,
    description,
    read,
  }: ICreateNotificationDTO): Promise<NotificationSchema>
  getAllNotifications(): Promise<NotificationSchema[]>
  getNotifications(userId: string): Promise<GetNotificationsSchema[]>
  delete(id: string): Promise<void>
}

export { INotificationsRepository }
