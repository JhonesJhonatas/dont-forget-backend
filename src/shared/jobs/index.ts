import nodeCron from 'node-cron'
import { NotificationJobs } from '../../modules/notifications/jobs/notificationJobs'
import { container } from 'tsyringe'

const notificationJobs = container.resolve(NotificationJobs)

nodeCron.schedule('1 0 * * *', () => {
  notificationJobs.GenerateNotificationForLateTasks()
})
