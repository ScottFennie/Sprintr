import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TaskService {
  async getTaskById(taskId) {
    const task = await dbContext.Tasks.findById(taskId)
    if (!task) {
      throw new BadRequest('Invalid project Id')
    }
    return task
  }

  async getTasks(projectId) {
    const tasks = await dbContext.Tasks.find({ projectId })
    return tasks
  }

  async editTask(itemId, userId, itemData) {
    const task = await this.getTaskById(itemId)
    if (userId !== task.creatorId.toString()) {
      throw new Forbidden('You cant do that! Stahp!')
    }
    task.name = itemData.name || task.name
    task.weight = itemData.weight || task.weight
    task.isComplete = itemData.isComplete || task.isComplete
    await task.save()
    return task
  }

  async createTask(taskData) {
    const task = await dbContext.Tasks.create(taskData)
    return task
  }

  async deleteTask(taskId, userId) {
    const task = await this.getTaskById(taskId)
    if (userId !== task.creatorId.toString()) {
      throw new Forbidden('You cant do that! Stahp!')
    }
    await task.remove()
    return task
  }
}

export const taskService = new TaskService()
