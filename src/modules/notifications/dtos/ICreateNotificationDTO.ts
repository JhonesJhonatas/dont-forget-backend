interface ICreateNotificationDTO {
  userId?: string
  type: 'success' | 'warning' | 'error' | 'common'
  title: string
  description: string
  read: boolean
}

export { ICreateNotificationDTO }
