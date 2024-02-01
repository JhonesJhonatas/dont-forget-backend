import 'reflect-metadata'
import 'dotenv/config'
import './shared/container'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { routes } from './routes'
import { AppError } from './errors/AppError'
import { mongoClient } from './mongo/mongoClient'
import './shared/jobs'

const app = express()
const port = process.env.PORT || 80

mongoClient.connect()

app.use(express.json())

const corsOptions = {
  origin: [
    'https://dont-forget-web.vercel.app',
    'http://127.0.0.1:5173',
    'https://www.dontforget.com.br/',
    'https://dontforget.com.br',
  ],
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

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
