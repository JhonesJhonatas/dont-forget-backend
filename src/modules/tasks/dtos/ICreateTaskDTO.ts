interface ICreateTaskDTO {
  title: string
  description: string
  priority: string
  status: string
  maturity: Date
  createdAt: Date
  completedAt?: Date
  projectId: string
}

export { ICreateTaskDTO }
