import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BacklogsService {
  async getBacklogs(projectId) {
    const res = await api.get(`api/projects/${projectId}/backlog`)
    logger.log('backlog', res)
    AppState.backlogs = res.data
  }

  async getCurrentBacklog(projectId) {
    const res = await api.get(`api/projects/${projectId}/backlog`)
    logger.log('backlog', res)
    AppState.backlogs = res.data
  }

  async createBacklog(backlogData, projectId) {
    const res = await api.post(`api/projects/${projectId}/backlog`, backlogData)
    logger.log('create bcaklog', res)
    AppState.backlogs.unshift(res.data)
  }
}

export const backlogsService = new BacklogsService()
