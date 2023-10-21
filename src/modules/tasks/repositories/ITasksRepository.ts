import { Tasks } from '@prisma/client'
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
    completedAt,
  }: ICreateTaskDTO): Promise<Tasks>
}

export { ITasksRepository }
