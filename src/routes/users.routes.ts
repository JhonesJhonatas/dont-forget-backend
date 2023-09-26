import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

const userRoutes = Router()

userRoutes.get('/get-all-users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()

    return res.send(users)
  } catch (err) {
    console.log('Error in /get-all-users', err)
  }
})

userRoutes.post('/create-new-user', async (req, res) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    birthDate: z.string(),
  })

  const { name, email, birthDate } = createUserSchema.parse(req.body)

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        birthDate,
      },
    })
  } catch (err) {
    console.log('Error in /create-new-user', err)
  }

  return res.status(201).send()
})

export { userRoutes }
