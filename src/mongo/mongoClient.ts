import mongoose from 'mongoose'
import { AppError } from '../errors/AppError'

class MongoClient {
  private getUrlDatabase() {
    return process.env.MONGO_URL || ''
  }

  public connect() {
    try {
      mongoose.connect(this.getUrlDatabase())
    } catch (err) {
      throw new AppError('MongoDb Connect Error', 400)
    }
  }
}

const mongoClient = new MongoClient()

export { mongoClient }
