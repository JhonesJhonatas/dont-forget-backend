import 'reflect-metadata'
import 'dotenv/config'
import './shared/container'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { routes } from './routes'
import { AppError } from './errors/AppError'

const app = express()
const port = process.env.PORT || 80

app.use(express.json())

app.use(cors())

app.use(routes)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)

app.listen(port, () => {
  console.log(`Server running on port: ${port}. 🚀🚀`)
})
