import { OpenedTasks } from '@prisma/client'
import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO'
import { IEditTaskDTO } from '../dtos/IEditTaskDTO'

interface ITasksRepository {
  create({
    description,
    maturity,
    priority,
    projectId,
    status,
    title,
  }: ICreateTaskDTO): Promise<OpenedTasks>

  findOpenedTasksByProjectId(projectId: string): Promise<OpenedTasks[]>

  findOpenedTasksByUserId(userId: string): Promise<OpenedTasks[]>

  editTaskById({
    description,
    maturity,
    priority,
    projectId,
    status,
    title,
    id,
  }: IEditTaskDTO): Promise<OpenedTasks>

  deleteOpenedTaskById(taskId: string): Promise<OpenedTasks>

  deleteConcludedTaskById(taskId: string): Promise<OpenedTasks>
}

export { ITasksRepository }
