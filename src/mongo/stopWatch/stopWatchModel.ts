import mongoose, { Schema } from 'mongoose'
import { StopWatchSchema } from './types/stopWatchTypes'

const stopWatchSchema = new Schema<StopWatchSchema>({
  userId: { type: String, required: true },
  taskId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  isActive: { type: Boolean, required: false },
})

const StopWatchModel = mongoose.model<StopWatchSchema>(
  'StopWatch',
  stopWatchSchema,
)

export { StopWatchModel }
