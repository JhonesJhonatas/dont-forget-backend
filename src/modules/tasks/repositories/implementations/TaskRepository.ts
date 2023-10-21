import { Tasks } from '@prisma/client'
import { ITasksRepository } from '../ITasksRepository'
import { prismaClient } from '../../../../prisma'
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO'

class TaskRepository implements ITasksRepository {
  async create({
    createdAt,
    description,
    maturity,
    priority,
    projectId,
    status,
    title,
    completedAt,
  }: ICreateTaskDTO): Promise<Tasks> {
    const task = await prismaClient.tasks.create({
      data: {
        createdAt,
        description,
        maturity,
        priority,
        status,
        title,
        completedAt,
        projectId,
      },
    })

    return task
  }
}

export { TaskRepository }
