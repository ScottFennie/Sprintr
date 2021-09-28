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

  async createTask(taskData) {
    const task = await dbContext.Sprints.create(taskData)
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
