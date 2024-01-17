interface ICreateNotificationDTO {
  userId: string
  type: string
  title: string
  description: string
  read: boolean
}

export { ICreateNotificationDTO }
