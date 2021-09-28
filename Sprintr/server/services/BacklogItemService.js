import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BacklogItemService {
  async getBacklogItems(projectId) {
    const backlog = await dbContext.BacklogItems.find({ projectId })
    return backlog
  }

  async getBacklogItemById(itemId) {
    const backlog = await dbContext.BacklogItems.findById(itemId)
    if (!backlog) {
      throw new BadRequest('invalid BacklogItem Id')
    }
    return backlog
  }

  async createBacklogItem(itemData) {
    const backlog = await dbContext.BacklogItems.create(itemData)
    return backlog
  }

  async editBacklogItem(itemId, userId, itemData) {
    const backlog = await this.getBacklogItemById(itemId)
    if (userId !== backlog.creatorId.toString()) {
      throw new Forbidden('You cant do that! Stahp!')
    }
    backlog.name = itemData.name || backlog.name
    backlog.description = itemData.description || backlog.description
    backlog.status = itemData.status || backlog.status
    await backlog.save()
    return backlog
  }

  async removeBacklogItem(itemId, userId) {
    const backlog = await this.getBacklogItemById(itemId)
    if (userId !== backlog.creatorId.toString()) {
      throw new Forbidden('You cant do that! Stahp!')
    }
    await backlog.remove()
    return backlog
  }
}

export const backlogItemService = new BacklogItemService()
