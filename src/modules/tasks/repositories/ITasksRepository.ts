import { OpenedTasks } from '@prisma/client'
import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO'
import { IEditTaskDTO } from '../dtos/IEditTaskDTO'

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

  findOpenedTasksByProjectId(projectId: string): Promise<OpenedTasks[]>

  editTaskById({
    description,
    maturity,
    priority,
    projectId,
    status,
    title,
    id,
  }: IEditTaskDTO): Promise<OpenedTasks>
}

export { ITasksRepository }
