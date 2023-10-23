import { Project } from '@prisma/client'
import { ICreatedProjectDTO } from '../../dtos/ICreateProjectDTO'
import { IProjectsRepository } from '../IProjectsRepository'
import { prismaClient } from '../../../../prisma'
import { IEditProjectDTO } from '../../dtos/IEditProjectDTO'

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

  async listProjects(userId: string): Promise<Project[]> {
    const projects = await prismaClient.project.findMany({
      where: {
        userId,
      },
    })

    return projects
  }

  async editProject({
    id,
    title,
    description,
    color,
  }: IEditProjectDTO): Promise<Project> {
    const project = await prismaClient.project.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        color,
      },
    })

    return project
  }
}

export { ProjectsRepository }
