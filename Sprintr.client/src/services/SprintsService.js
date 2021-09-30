import { AppState } from '../AppState'
import { Sprint } from '../models/Sprint'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class SprintsService {
  async getSprints(projectId) {
    const res = await api.get(`api/projects/${projectId}/sprints`)
    logger.log('sprint', res)
    AppState.sprints = new Sprint(res.data)
  }

  async createSprint(sprintData, projectId) {
    const res = await api.post(`api/projects/${projectId}/sprints`, sprintData)
    logger.log('create sprint', res)
    AppState.sprints = new Sprint(res.data)
  }
}

export const sprintsService = new SprintsService()
