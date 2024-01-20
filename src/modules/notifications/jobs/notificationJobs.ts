import { inject, injectable } from 'tsyringe'
import { INotificationsRepository } from '../repositories/INotificationsRepository'
import { IUsersRepository } from '../../users/repositories/IUsersRepository'
import { ITasksRepository } from '../../tasks/repositories/ITasksRepository'
import { format, isAfter } from 'date-fns'

@injectable()
class NotificationJobs {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async GenerateNotificationForLateTasks() {
    const todayDate = new Date()

    const [allTasks, allNotifications] = await Promise.all([
      this.tasksRepository.getAllTasks(),
      this.notificationsRepository.getAllNotifications(),
    ])

    const lateTasksAndNoNotifications = allTasks.filter((task) => {
      const formattedTodayDate = format(todayDate, 'yyyy/MM/dd')
      const fomattedTaskMaturity = format(task.maturity, 'yyyy/MM/dd')

      const thisTaskIsLate = isAfter(formattedTodayDate, fomattedTaskMaturity)

      const thisNotificationAlreadyExists = allNotifications.some(
        (existingNotification) => {
          return (
            existingNotification.description ===
            `A tarefa ${task.title} está atrasada desde ${format(
              task.maturity,
              'dd/MM/yyyy',
            )}.`
          )
        },
      )

      if (thisNotificationAlreadyExists) return false

      return thisTaskIsLate
    })

    lateTasksAndNoNotifications.forEach(async (task) => {
      await this.notificationsRepository.create({
        userId: task.userId,
        type: 'warning',
        title: 'Tarefa Atrasada',
        description: `A tarefa ${task.title} está atrasada desde ${format(
          task.maturity,
          'dd/MM/yyyy',
        )}.`,
        read: false,
      })
    })
  }
}

export { NotificationJobs }
