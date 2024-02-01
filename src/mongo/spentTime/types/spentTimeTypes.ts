import { Types } from 'mongoose'

export interface SpentTimeSchema {
  taskId: string
  startDate: Date
  endDate?: Date
  isActive: boolean
}

export interface GetSpentTimeSchema {
  _id: Types.ObjectId
  taskId: string
  startDate: Date
  endDate?: Date
  isActive: boolean
}
