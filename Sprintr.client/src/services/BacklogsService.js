import { AppState } from '../AppState'
import { Backlog } from '../models/Backlog'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BacklogsService {
  async getBacklogs(projectId) {
    const res = await api.get(`api/projects/${projectId}/backlog`)
    logger.log('backlog', res)
    AppState.backlogs = res.data.map(b => new Backlog(b))
  }

  async createBacklog(backlogData, projectId) {
    const res = await api.post(`api/projects/${projectId}/backlog`, backlogData)
    logger.log('create bcaklog', res)
    AppState.backlogs = new Backlog(res.data)
  }

  async getCurrentBacklog(backlogId) {
    AppState.currentBacklog = AppState.backlogs.find(b => b.id === backlogId)
  }
}

export const backlogsService = new BacklogsService()
