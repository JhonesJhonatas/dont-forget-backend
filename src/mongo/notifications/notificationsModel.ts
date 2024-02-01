import mongoose, { Schema } from 'mongoose'
import { NotificationSchema } from './types/notificationsTypes'

const notificationSchema = new Schema<NotificationSchema>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  read: { type: Boolean, required: true },
})

const NotificationModel = mongoose.model<NotificationSchema>(
  'Notifications',
  notificationSchema,
)

export { NotificationModel }
