import { Types } from 'mongoose'

export interface StopWatchSchema {
  taskId: string
  startDate: Date
  endDate?: Date
  isActive: boolean
}

export interface GetStopWatchSchema {
  _id: Types.ObjectId
  taskId: string
  startDate: Date
  endDate?: Date
  isActive: boolean
}
