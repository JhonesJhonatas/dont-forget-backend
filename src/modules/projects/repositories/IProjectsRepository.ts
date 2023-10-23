import { Project } from '@prisma/client'
import { ICreatedProjectDTO } from '../dtos/ICreateProjectDTO'

interface IProjectsRepository {
  create({
    color,
    createdAt,
    description,
    title,
    userId,
  }: ICreatedProjectDTO): Promise<Project>

  listProjects(userId: string): Promise<Project[]>
}

export { IProjectsRepository }
