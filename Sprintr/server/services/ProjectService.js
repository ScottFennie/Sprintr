import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProjectService {
  async getProjectById(projectId) {
    const project = await dbContext.Projects.findById(projectId)
    if (!project) {
      throw new BadRequest('invalid project Id')
    }
    return project
  }

  async getProjects(query) {
    const projects = await dbContext.Projects.find(query)
    return projects
  }

  async createProject(projectData) {
    const project = await dbContext.Projects.create(projectData)
    await project.populate('creator', 'name picture')
    return project
  }

  async removeProject(projectId, userId) {
    const project = await this.getProjectById(projectId)
    if (userId !== project.creatorId.toString()) {
      throw new Forbidden('You cant do that! Stahp!')
    }
    await project.remove()
    return project
  }
}

export const projectService = new ProjectService()
