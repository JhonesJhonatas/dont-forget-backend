import nodeCron from 'node-cron'
import { NotificationJobs } from '../../modules/notifications/jobs/notificationJobs'
import { container } from 'tsyringe'
import { UsersJobs } from '../../modules/users/jobs/userJobs'

const notificationJobs = container.resolve(NotificationJobs)
const userJobos = container.resolve(UsersJobs)

const brazilTimeZone = 'America/Sao_Paulo'

nodeCron.schedule(
  '1 0 * * *',
  () => {
    notificationJobs.GenerateNotificationForLateTasks()
    console.log('JOBGenerateNotificationForLateTasks ⚙️')
  },
  {
    scheduled: true,
    timezone: brazilTimeZone,
  },
)

nodeCron.schedule(
  '2 0 * * *',
  () => {
    userJobos.deleteInactiveUsers()
    console.log('JOBDeleteInactiveUsers ⚙️')
  },
  {
    scheduled: true,
    timezone: brazilTimeZone,
  },
)
