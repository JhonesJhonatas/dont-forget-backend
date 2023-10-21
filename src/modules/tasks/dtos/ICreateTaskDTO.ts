interface ICreateTaskDTO {
  title: string
  description: string
  priority: string
  status: string
  maturity: Date
  createdAt: Date
  projectId: string
}

export { ICreateTaskDTO }
