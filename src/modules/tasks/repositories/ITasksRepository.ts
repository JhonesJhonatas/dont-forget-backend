import { ConcludedTasks, OpenedTasks } from '@prisma/client'
import { ICreateTaskDTO } from '../dtos/ICreateTaskDTO'
import { IEditTaskDTO } from '../dtos/IEditTaskDTO'
import { ICreateConcludedTaskDTO } from '../../projects/dtos/ICreatedConcludedTaskDTO'
import {
  GetStopWatchSchema,
  StopWatchSchema,
} from '../../../mongo/stopWatch/types/stopWatchTypes'
import { IStartStopWatchDTO } from '../dtos/IStartStopWatchDTO'
import { IStopStopWatchDTO } from '../dtos/IStopStopWatch'
import { IGetOpenedTasksByWeek } from '../dtos/IGetOpenedTasksByWeek'

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

  getOpenedTasksByWeek({
    startDate,
    endDate,
  }: IGetOpenedTasksByWeek): Promise<OpenedTasks[]>

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

  startStopWatch({
    userId,
    taskId,
    startDate,
    isActive,
  }: IStartStopWatchDTO): Promise<StopWatchSchema>

  getStopWatchesByTaskId(taskId: string): Promise<GetStopWatchSchema[]>

  getStopWatchesByUserId(userId: string): Promise<GetStopWatchSchema[]>

  editStopWatch({
    userId,
    taskId,
    startDate,
    endDate,
    isActive,
  }: IStopStopWatchDTO): Promise<StopWatchSchema>

  deleteStopWatch(id: string): Promise<void>

  deleteStopWatchesByTaskId(taskId: string): Promise<void>

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
