import { Types } from 'mongoose'

export interface NotificationSchema {
  userId: string
  type: string
  title: string
  description: string
  read: boolean
}

export interface GetNotificationsSchema {
  _id: Types.ObjectId
  userId: string
  type: string
  title: string
  description: string
  read: boolean
}
