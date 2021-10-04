import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class SprintService {
  async getSprintById(sprintId) {
    const sprint = await dbContext.Sprints.findById(sprintId)
    if (!sprint) {
      throw new BadRequest('invalid sprint Id')
    }
    return sprint
  }

  async getSprints(projectId) {
    const sprints = await dbContext.Sprints.find({ projectId })
    return sprints
  }

  async createSprint(sprintData) {
    const sprint = await dbContext.Sprints.create(sprintData)
    return sprint
  }

  async deleteSprint(sprintId, userId) {
    const sprint = await this.getSprintById(sprintId)
    if (userId !== sprint.creatorId.toString()) {
      throw new Forbidden('You cant do that! Stahp!')
    }
    await sprint.remove()
    return sprint
  }
}
export const sprintService = new SprintService()
