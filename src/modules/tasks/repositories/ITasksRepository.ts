import { OpenedTasks } from '@prisma/client'
import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO'

interface ITasksRepository {
  create({
    createdAt,
    description,
    maturity,
    priority,
    projectId,
    status,
    title,
  }: ICreateTaskDTO): Promise<OpenedTasks>
}

export { ITasksRepository }
