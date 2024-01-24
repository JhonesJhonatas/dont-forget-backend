import { ConcludedTasks, OpenedTasks } from '@prisma/client'
import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO'
import { IEditTaskDTO } from '../dtos/IEditTaskDTO'
import { ICreateConcludedTaskDTO } from '../../projects/dtos/ICreatedConcludedTaskDTO'

interface ITasksRepository {
  create({
    description,
    maturity,
    priority,
    projectId,
    status,
    title,
  }: ICreateTaskDTO): Promise<OpenedTasks>

  getAllTasks(): Promise<OpenedTasks[]>

  findAllLateTasks(date: Date): Promise<OpenedTasks[]>

  findOpenedTasksByProjectId(projectId: string): Promise<OpenedTasks[]>

  findOpenedTasksByUserId(userId: string): Promise<OpenedTasks[]>

  findConcludedTasksByProjectId(projectId: string): Promise<ConcludedTasks[]>

  findConcludedTasksByUserId(userId: string): Promise<ConcludedTasks[]>

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

  deleteConcludedTaskById(taskId: string): Promise<ConcludedTasks>

  createConcludedTask({
    createdAt,
    description,
    maturity,
    priority,
    projectId,
    status,
    title,
    userId,
  }: ICreateConcludedTaskDTO): Promise<ConcludedTasks>
}

export { ITasksRepository }
