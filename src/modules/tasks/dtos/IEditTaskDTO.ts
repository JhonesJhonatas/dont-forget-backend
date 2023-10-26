interface IEditTaskDTO {
  id: string
  title: string
  description: string
  priority: string
  status: string
  maturity: Date
  projectId: string
}

export { IEditTaskDTO }
