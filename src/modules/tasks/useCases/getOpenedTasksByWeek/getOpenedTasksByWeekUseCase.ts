import { inject, injectable } from 'tsyringe'
import { ITasksRepository } from '../../repositories/ITasksRepository'
import { IGetOpenedTasksByWeek } from '../../dtos/IGetOpenedTasksByWeek'
import {
  isFriday,
  isMonday,
  isSameWeek,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
} from 'date-fns'
import { AppError } from '../../../../errors/AppError'

@injectable()
class GetOpenedTasksByWeekUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  async execute({ startDate, endDate, userId }: IGetOpenedTasksByWeek) {
    const startDateIsMonday = isMonday(startDate)
    const endDateIsSunday = isSunday(endDate)
    const isSameWeekCheck = isSameWeek(startDate, endDate, { weekStartsOn: 1 })

    if (!startDateIsMonday) {
      throw new AppError('startDate must be a Monday', 400)
    }

    if (!endDateIsSunday) {
      throw new AppError('endDate must be a Sunday', 400)
    }

    if (!isSameWeekCheck) {
      throw new AppError('Dates not in same Week', 400)
    }

    const tasksOfWeek = await this.tasksRepository.getOpenedTasksByWeek({
      userId,
      startDate,
      endDate,
    })

    const monday = tasksOfWeek.filter((task) => {
      if (!task.maturity) {
        return false
      }
      return isMonday(task.maturity)
    })
    const tuesday = tasksOfWeek.filter((task) => {
      if (!task.maturity) {
        return false
      }
      return isTuesday(new Date(task.maturity))
    })
    const wednesday = tasksOfWeek.filter((task) => {
      if (!task.maturity) {
        return false
      }
      return isWednesday(new Date(task.maturity))
    })
    const thursday = tasksOfWeek.filter((task) => {
      if (!task.maturity) {
        return false
      }
      return isThursday(new Date(task.maturity))
    })
    const friday = tasksOfWeek.filter((task) => {
      if (!task.maturity) {
        return false
      }
      return isFriday(new Date(task.maturity))
    })
    const saturday = tasksOfWeek.filter((task) => {
      if (!task.maturity) {
        return false
      }
      return isSaturday(new Date(task.maturity))
    })
    const sunday = tasksOfWeek.filter((task) => {
      if (!task.maturity) {
        return false
      }
      return isSunday(new Date(task.maturity))
    })

    const tasksByWeek = {
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    }

    return tasksByWeek
  }
}

export { GetOpenedTasksByWeekUseCase }
