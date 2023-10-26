interface ICreateConcludedTaskDTO {
  title: string
  description: string
  priority: string
  status: string
  maturity: Date
  createdAt: Date
  projectId: string
  userId: string
}

export { ICreateConcludedTaskDTO }
