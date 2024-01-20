import nodeCron from 'node-cron'
import { NotificationJobs } from '../../modules/notifications/jobs/notificationJobs'
import { container } from 'tsyringe'

const notificationJobs = container.resolve(NotificationJobs)

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
