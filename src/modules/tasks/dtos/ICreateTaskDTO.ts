interface ICreateTaskDTO {
  title: string
  description: string
  priority: string
  status: string
  maturity: Date
  projectId: string
  userId: string
}

export { ICreateTaskDTO }
