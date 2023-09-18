import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function taskRoutes(app: FastifyInstance) {
  app.get('/get-all-tasks', async () => {
    try {
      const tasks = await prisma.task.findMany()

      return tasks
    } catch (err) {
      console.log('Error in /get-all-tasks')
    }
  })

  app.post('/create-new-task', async (req, res) => {
    const createTaskSchema = z.object({
      createdAt: z.string(),
      maturity: z.string(),
      title: z.string(),
      status: z.string(),
      priority: z.string(),
      description: z.string(),
      userId: z.string(),
    })

    const {
      createdAt,
      maturity,
      title,
      status,
      priority,
      description,
      userId,
    } = createTaskSchema.parse(req.body)

    try {
      await prisma.task.create({
        data: {
          createdAt,
          maturity,
          title,
          status,
          priority,
          description,
          userId,
        },
      })
    } catch (err) {
      console.log('Error in /create-new-task', err)
    }

    return res.status(201).send()
  })
}
