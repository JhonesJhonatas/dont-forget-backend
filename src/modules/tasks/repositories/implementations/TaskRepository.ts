import { OpenedTasks } from '@prisma/client'
import { ITasksRepository } from '../ITasksRepository'
import { prismaClient } from '../../../../prisma'
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO'
import { IEditTaskDTO } from '../../dtos/IEditTaskDTO'

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

  async findOpenedTasksByProjectId(projectId: string): Promise<OpenedTasks[]> {
    const tasks = await prismaClient.openedTasks.findMany({
      where: {
        projectId,
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
