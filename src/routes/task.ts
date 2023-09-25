import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
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

  app.delete(
    '/delete-task-by-id/:taskId',
    async (req: FastifyRequest, res: FastifyReply) => {
      const deleteTaskParams = z.object({
        taskId: z.string(),
      })

      const { taskId } = deleteTaskParams.parse(req.params)

      try {
        const deleteTask = await prisma.task.delete({
          where: {
            id: taskId,
          },
        })

        return {
          deleteTask,
        }
      } catch (err) {
        console.log('Error in /delete-task-by-id', err)
        res.status(500).send({
          error: 'Internal Server Error',
        })
      }
    },
  )
}
