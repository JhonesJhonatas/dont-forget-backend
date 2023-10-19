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
}

export { IProjectsRepository }
