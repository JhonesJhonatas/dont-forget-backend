import mongoose, { Schema } from 'mongoose'
import { ICreateNotificationDTO } from '../modules/users/dtos/ICreateNotificationDTO'

const notificationSchema = new Schema<ICreateNotificationDTO>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  read: { type: Boolean, required: true },
})

const NotificationModel = mongoose.model<ICreateNotificationDTO>(
  'Notifications',
  notificationSchema,
)

export { NotificationModel }
