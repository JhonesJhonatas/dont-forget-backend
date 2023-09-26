import fastify from 'fastify'
import 'dotenv/config'
import { taskRoutes } from './routes/task'
import { userRoutes } from './routes/user'
import cors from '@fastify/cors'

const app = fastify()
const port = process.env.PORT || 3333

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', '*'],
})

app.register(userRoutes, {
  prefix: 'user',
})

app.register(taskRoutes, {
  prefix: 'tasks',
})

try {
  app.listen(port)
  console.log(`Http server running on port: ${port}`)
} catch (err) {
  app.log.error(err)
}
