import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BacklogsService {
  async getBacklog(proId) {
    const res = await api.get(`api/projects/${proId}/backlogs`)
    logger.log('backlog', res)
    AppState.backlog = res.data
  }
}

export const backlogsService = new BacklogsService()
