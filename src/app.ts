/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import 'dotenv/config'

import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'

import '@shared/container'

import { AppError } from './errors/AppError'

import { router } from './routes'

const app = express()

app.use(express.json())

app.use(cors())
app.use(router)

app.use((err: Error, __: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  })
})

export { app }
