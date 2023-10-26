import { ConcludedTasks, OpenedTasks } from '@prisma/client'
import { ITasksRepository } from '../ITasksRepository'
import { prismaClient } from '../../../../prisma'
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO'
import { IEditTaskDTO } from '../../dtos/IEditTaskDTO'
import { ICreateConcludedTaskDTO } from '../../../projects/dtos/ICreatedConcludedTaskDTO'

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

  async deleteOpenedTaskById(taskId: string): Promise<OpenedTasks> {
    const deletedTask = await prismaClient.openedTasks.delete({
      where: {
        id: taskId,
      },
    })

    return deletedTask
  }

  async deleteConcludedTaskById(taskId: string): Promise<OpenedTasks> {
    const deletedTask = await prismaClient.openedTasks.delete({
      where: {
        id: taskId,
      },
    })

    return deletedTask
  }

  async createConcludedTask({
    createdAt,
    description,
    maturity,
    priority,
    projectId,
    title,
    status,
    userId,
  }: ICreateConcludedTaskDTO): Promise<ConcludedTasks> {
    const createdConcludedTask = await prismaClient.concludedTasks.create({
      data: {
        createdAt,
        status,
        description,
        maturity,
        priority,
        projectId,
        title,
        userId,
      },
    })

    return createdConcludedTask
  }
}

export { TaskRepository }
