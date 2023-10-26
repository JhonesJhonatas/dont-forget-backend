import { OpenedTasks } from '@prisma/client'
import { ITasksRepository } from '../ITasksRepository'
import { prismaClient } from '../../../../prisma'
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO'
import { IEditTaskDTO } from '../../dtos/IEditTaskDTO'

class TaskRepository implements ITasksRepository {
  async create({
    description,
    maturity,
    priority,
    projectId,
    status,
    title,
    userId,
  }: ICreateTaskDTO): Promise<OpenedTasks> {
    const task = await prismaClient.openedTasks.create({
      data: {
        description,
        maturity,
        priority,
        status,
        title,
        projectId,
        userId,
      },
    })

    return task
  }

  async findOpenedTasksByProjectId(projectId: string): Promise<OpenedTasks[]> {
    const tasks = await prismaClient.openedTasks.findMany({
      where: {
        projectId,
      },
    })

    return tasks
  }

  async findOpenedTasksByUserId(userId: string): Promise<OpenedTasks[]> {
    const tasks = await prismaClient.openedTasks.findMany({
      where: {
        userId,
      },
    })

    return tasks
  }

  async editTaskById({
    description,
    id,
    maturity,
    priority,
    projectId,
    status,
    title,
  }: IEditTaskDTO): Promise<OpenedTasks> {
    const task = await prismaClient.openedTasks.update({
      where: {
        id,
      },
      data: {
        description,
        maturity,
        priority,
        projectId,
        status,
        title,
        id,
      },
    })

    return task
  }
}

export { TaskRepository }
