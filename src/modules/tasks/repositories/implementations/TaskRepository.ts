import { OpenedTasks } from '@prisma/client'
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
  }: ICreateTaskDTO): Promise<OpenedTasks> {
    const task = await prismaClient.openedTasks.create({
      data: {
        createdAt,
        description,
        maturity,
        priority,
        status,
        title,
        projectId,
      },
    })

    return task
  }
}

export { TaskRepository }
