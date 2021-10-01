import { AppState } from '../AppState'
import { Project } from '../models/Project'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProjectService {
  async getProjects(query = {}) {
    const res = await api.get('api/projects')
    AppState.projects = res.data
    logger.log('this is the appstate', res)
  }

  async getCurrentProjectById(projectId) {
    const res = await api.get(`api/projects/${projectId}`)
    logger.log('go get project ID', res)
    AppState.project = new Project(res.data)
  }

  async goToProjectPage(projectId) {
    const res = await api.get(`api/projects/${projectId}/backlog`)
    logger.log('go to project page', res)
  }

  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    logger.log('heres the new project', res)
    AppState.projects.push(res.data)
    router.push({ name: 'Projects.Backlog', params: { projectId: res.data.id } })
  }

  async removeProject(proId) {
    const res = await api.delete('api/projects/' + proId)
    logger.log('delete project', res)
    AppState.projects = AppState.projects.filter(p => p.id !== proId)

    router.push({ name: 'Home' })
  }
}
export const projectService = new ProjectService()
