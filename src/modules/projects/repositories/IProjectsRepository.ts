import { Project } from '@prisma/client'
import { ICreatedProjectDTO } from '../dtos/ICreateProjectDTO'
import { IEditProjectDTO } from '../dtos/IEditProjectDTO'

interface IProjectsRepository {
  create({
    color,
    createdAt,
    description,
    title,
    userId,
  }: ICreatedProjectDTO): Promise<Project>

  listProjects(userId: string): Promise<Project[]>

  editProject({
    id,
    title,
    description,
    color,
  }: IEditProjectDTO): Promise<Project>
}

export { IProjectsRepository }
