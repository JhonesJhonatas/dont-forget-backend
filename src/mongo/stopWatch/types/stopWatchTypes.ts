import { Types } from 'mongoose'

export interface StopWatchSchema {
  userId: string
  taskId: string
  startDate: Date
  endDate?: Date
  isActive: boolean
}

export interface GetStopWatchSchema {
  _id: Types.ObjectId
  userId: string
  taskId: string
  startDate: Date
  endDate?: Date
  isActive: boolean
}
