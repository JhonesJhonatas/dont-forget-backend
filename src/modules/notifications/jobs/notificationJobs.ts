import { inject, injectable } from 'tsyringe'
import { INotificationsRepository } from '../repositories/INotificationsRepository'
import { ITasksRepository } from '../../tasks/repositories/ITasksRepository'
import { format } from 'date-fns'

@injectable()
class NotificationJobs {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async GenerateNotificationForLateTasks() {
    const todayDate = new Date()

    todayDate.setHours(0, 0, 0, 0)

    const [lateTasks, allNotifications] = await Promise.all([
      this.tasksRepository.findAllLateTasks(todayDate),
      this.notificationsRepository.getAllNotifications(),
    ])

    lateTasks.forEach(async (task) => {
      const alreadyNotificated = allNotifications.some(
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

      if (alreadyNotificated) return

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
