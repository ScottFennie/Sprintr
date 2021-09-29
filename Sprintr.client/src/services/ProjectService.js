import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProjectService {
  async getProjects(query = {}) {
    const res = await api.get('api/projects')
    AppState.projects = res.data
    logger.log('this is the appstate', res)
  }

  async goToProjectPage(projectId) {
    const res = await api.get(`api/projects/${projectId}`)
  }
}
export const projectService = new ProjectService()
