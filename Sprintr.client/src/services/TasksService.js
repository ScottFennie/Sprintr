import { AppState } from '../AppState'
import { Task } from '../models/Task'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TasksService {
  async createTask(taskData, projectId) {
    const res = await api.post(`api/projects/${projectId}/tasks`, taskData)
    logger.log('create task', res)
    AppState.tasks.push(new Task(res.data))
  }
}
export const tasksService = new TasksService()
