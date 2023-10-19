import { Project } from '@prisma/client'
import { ICreatedProjectDTO } from '../../dtos/ICreateProjectDTO'
import { IProjectsRepository } from '../IProjectsRepository'
import { prismaClient } from '../../../../prisma'

class ProjectsRepository implements IProjectsRepository {
  async create({
    color,
    createdAt,
    description,
    title,
    userId,
  }: ICreatedProjectDTO): Promise<Project> {
    const project = await prismaClient.project.create({
      data: {
        color,
        createdAt,
        description,
        title,
        userId,
      },
    })

    return project
  }
}

export { ProjectsRepository }
