import { ConcludedTasks, OpenedTasks } from '@prisma/client'
import { ITasksRepository } from '../ITasksRepository'
import { prismaClient } from '../../../../prisma'
import { ICreateTaskDTO } from '../../dtos/ICreateTaskDTO'
import { IEditTaskDTO } from '../../dtos/IEditTaskDTO'
import { ICreateConcludedTaskDTO } from '../../../projects/dtos/ICreatedConcludedTaskDTO'
import {
  GetStopWatchSchema,
  StopWatchSchema,
} from '../../../../mongo/stopWatch/types/stopWatchTypes'
import { IStartStopWatchDTO } from '../../dtos/IStartStopWatchDTO'
import { StopWatchModel } from '../../../../mongo/stopWatch/stopWatchModel'
import { AppError } from '../../../../errors/AppError'
import { IStopStopWatchDTO } from '../../dtos/IStopStopWatch'

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

  async getAllTasks(): Promise<OpenedTasks[]> {
    const allTasks = await prismaClient.openedTasks.findMany()

    return allTasks
  }

  async findAllLateTasks(date: Date): Promise<OpenedTasks[]> {
    const lateTasks = await prismaClient.openedTasks.findMany({
      where: {
        maturity: {
          lt: date,
        },
      },
    })

    return lateTasks
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

  async findConcludedTasksByProjectId(
    projectId: string,
  ): Promise<ConcludedTasks[]> {
    const tasks = await prismaClient.concludedTasks.findMany({
      where: {
        projectId,
      },
    })

    return tasks
  }

  async findConcludedTasksByUserId(userId: string): Promise<ConcludedTasks[]> {
    const tasks = await prismaClient.concludedTasks.findMany({
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
    const updatedTask = await prismaClient.openedTasks.update({
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

    return updatedTask
  }

  async startStopWatch({
    taskId,
    startDate,
    isActive,
  }: IStartStopWatchDTO): Promise<StopWatchSchema> {
    const stopWatchBody = { taskId, startDate, isActive }

    const stopWatchModel = new StopWatchModel(stopWatchBody)

    const savedStopWatch = await stopWatchModel.save()

    return savedStopWatch
  }

  async getStopWatchesByTaskId(taskId: string): Promise<GetStopWatchSchema[]> {
    const stopWatches = await StopWatchModel.find({ taskId })

    return stopWatches
  }

  async editStopWatch({
    id,
    taskId,
    startDate,
    endDate,
    isActive,
  }: IStopStopWatchDTO): Promise<StopWatchSchema> {
    await StopWatchModel.updateOne(
      { _id: id },
      {
        $set: {
          taskId,
          startDate,
          endDate,
          isActive,
        },
      },
    )

    const editedStopWatch = await StopWatchModel.findById(id)

    return editedStopWatch as StopWatchSchema
  }

  async deleteStopWatch(id: string): Promise<void> {
    try {
      await StopWatchModel.deleteOne({
        _id: id,
      })
    } catch (err) {
      throw new AppError('StopWatch Not Found', 404)
    }
  }

  async deleteOpenedTaskById(taskId: string): Promise<OpenedTasks> {
    const deletedTask = await prismaClient.openedTasks.delete({
      where: {
        id: taskId,
      },
    })

    return deletedTask
  }

  async deleteConcludedTaskById(taskId: string): Promise<ConcludedTasks> {
    const deletedTask = await prismaClient.concludedTasks.delete({
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
