import { AppState } from '../AppState'
import { Backlog } from '../models/Backlog'
import { Note } from '../models/Note'
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
    AppState.backlogs.push(new Backlog(res.data))
  }

  async getCurrentBacklog(backlogId) {
    AppState.currentBacklog = []
    AppState.currentBacklog = AppState.backlogs.find(b => b.id === backlogId)
    logger.log('appstate current backlog', AppState.currentBacklog)
  }

  async editBacklog(backlogData, projectId) {
    const res = await api.put(`api/projects/${projectId}/backlog/${backlogData.id}`, backlogData)
    logger.log('edit', res)
    AppState.backlogs = new Backlog(res.data)
  }

  async removeBacklog(backlogId, projectId) {
    const res = await api.delete(`api/projects/${projectId}/backlog/` + backlogId)
    logger.log('delete backlog', res)
    AppState.backlogs = AppState.backlogs.filter(b => b.id !== backlogId)
  }

  async createNote(backlogId, projectId, backlogData) {
    const res = await api.post(`api/projects/${projectId}/notes`, backlogData)
    logger.log('create new note', res)
    AppState.notes.push(new Note(res.data))
    AppState.currentNotes.push(new Note(res.data))
  }

  async getNotes(backlogId, projectId) {
    AppState.currentNotes = []
    const res = await api.get(`api/projects/${projectId}/notes`)
    AppState.notes = res.data.map(n => new Note(n))
    AppState.currentNotes = AppState.notes.filter(n => n.backlogItemId === backlogId)

    logger.log('this is the notes for this backlog', AppState.notes)
  }
}

export const backlogsService = new BacklogsService()
