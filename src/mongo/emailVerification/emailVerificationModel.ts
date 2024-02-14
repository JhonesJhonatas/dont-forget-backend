import mongoose, { Schema } from 'mongoose'
import { EmailVerificationSchema } from './types/emailVerificationTypes'

const emailVerificationSchema = new Schema<EmailVerificationSchema>({
  userId: { type: String, required: true },
  code: { type: String, required: true },
  created_at: { type: Date, required: true },
})

const EmailVerificationModel = mongoose.model<EmailVerificationSchema>(
  'EmailVerification',
  emailVerificationSchema,
)

export { EmailVerificationModel }
