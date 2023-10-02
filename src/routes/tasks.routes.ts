import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

const taskRoutes = Router()

taskRoutes.get('/get-all-tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany()

    return res.send(tasks)
  } catch (err) {
    console.log('Error in /get-all-tasks')
  }
})

taskRoutes.get('/get-tasks-by-status/:taskStatus', async (req, res) => {
  const { taskStatus } = req.params

  try {
    const tasks = await prisma.task.findMany({
      where: {
        status: taskStatus,
      },
    })

    return res.send(tasks)
  } catch (err) {
    console.log('Error in /get-tasks-by-status', err)
    res.status(500).send({
      error: 'Internal Server Error',
    })
  }
})

taskRoutes.post('/create-new-task', async (req, res) => {
  const createTaskSchema = z.object({
    createdAt: z.string(),
    maturity: z.string(),
    title: z.string(),
    status: z.string(),
    priority: z.string(),
    description: z.string(),
    userId: z.string(),
  })

  const { createdAt, maturity, title, status, priority, description, userId } =
    createTaskSchema.parse(req.body)

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

taskRoutes.put('/update-task-by-id/:taskId', async (req, res) => {
  const reqParamsSchema = z.object({
    taskId: z.string(),
  })

  const reqBodyParams = z.object({
    completedAt: z.string(),
    maturity: z.string(),
    title: z.string(),
    status: z.string(),
    priority: z.string(),
    description: z.string(),
  })

  const { taskId } = reqParamsSchema.parse(req.params)

  const { completedAt, description, maturity, priority, status, title } =
    reqBodyParams.parse(req.body)

  try {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: { completedAt, description, maturity, priority, status, title },
    })

    return res.status(200).json({ message: 'Tarefa atualizada com sucesso' })
  } catch (err) {
    return res.status(400).json({ error: 'Erro na atualização da tarefa' })
  }
})

taskRoutes.delete('/delete-task-by-id/:taskId', async (req, res) => {
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

    return res.send(deleteTask)
  } catch (err) {
    console.log('Error in /delete-task-by-id', err)
    res.status(500).send({
      error: 'Internal Server Error',
    })
  }
})

export { taskRoutes }
