import mongoose, { Schema } from 'mongoose'
import { SpentTimeSchema } from './types/spentTimeTypes'

const spentTimeSchema = new Schema<SpentTimeSchema>({
  taskId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  isActive: { type: Boolean, required: false },
})

const SpentTimeModel = mongoose.model<SpentTimeSchema>(
  'SpentTime',
  spentTimeSchema,
)

export { SpentTimeModel }
