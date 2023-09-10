import fastify from 'fastify'
import { taskRoutes } from './routes/task'
import { userRoutes } from './routes/user'

const app = fastify()
const port = 3333

app.register(userRoutes, {
  prefix: 'user',
})

app.register(taskRoutes, {
  prefix: 'tasks',
})

try {
  app.listen({ port })
  console.log(`Http server running on port: ${port}`)
} catch (err) {
  app.log.error(err)
}
