import {
  GetNotificationsSchema,
  NotificationSchema,
} from '../../../mongo/schemaTypes'
import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO'

interface INotificationsRepository {
  create({
    type,
    title,
    description,
    read,
  }: ICreateNotificationDTO): Promise<NotificationSchema>
  getNotifications(userId: string): Promise<GetNotificationsSchema[]>
}

export { INotificationsRepository }
