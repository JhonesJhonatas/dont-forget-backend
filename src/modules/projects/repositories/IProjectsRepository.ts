import { Project } from '@prisma/client'
import { ICreatedProjectDTO } from '../dtos/ICreateProjectDTO'
import { IEditProjectDTO } from '../dtos/IEditProjectDTO'

interface IProjectsRepository {
  create({
    color,
    description,
    title,
    userId,
  }: ICreatedProjectDTO): Promise<Project>

  listProjects(userId: string): Promise<Project[]>

  getProjectById(projectId: string): Promise<Project>

  editProject({
    id,
    title,
    description,
    color,
  }: IEditProjectDTO): Promise<Project>

  deletProject(projectId: string): Promise<Project>
}

export { IProjectsRepository }
