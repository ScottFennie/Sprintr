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

  async getCurrentBacklog(projectId) {
    const res = await api.get(`api/projects/${projectId}/backlog`)
    logger.log('backlog', res)
    AppState.backlogs = res.data
  }

  async createBacklog(backlogData, projectId) {
    const res = await api.post(`api/projects/${projectId}/backlog`, backlogData)
    logger.log('create bcaklog', res)
    AppState.backlogs = new Backlog(res.data)
  }
}

export const backlogsService = new BacklogsService()
