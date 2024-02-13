import { Types } from 'mongoose'

export interface EmailVerificationSchema {
  userId: string
  code: string
  created_at: Date
}

export interface GetEmailVerificationSchema {
  _id: Types.ObjectId
  userId: string
  code: string
  created_at: Date
}
