import { AppState } from '../AppState'
import { Backlog } from '../models/Backlog'
import { Note } from '../models/Note'
import { Task } from '../models/Task'
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

  async createTask(backlogId, projectId, backlogData) {
    logger.log('this is the PROJECT ID', projectId)
    const res = await api.post(`api/projects/${projectId}/tasks`, backlogData)
    logger.log('create new task', res)
    AppState.tasks.push(new Task(res.data))
    AppState.currentTasks.push(new Task(res.data))
  }

  async getTasks(backlogId, projectId) {
    AppState.currentTasks = []
    const res = await api.get(`api/projects/${projectId}/tasks`)
    AppState.tasks = res.data.map(t => new Task(t))
    AppState.currentTasks = AppState.tasks.filter(t => t.backlogItemId === backlogId)

    logger.log('These are the tasks', AppState.currentTasks)
  }

  async getNotes(backlogId, projectId) {
    AppState.currentNotes = []
    const res = await api.get(`api/projects/${projectId}/notes`)
    AppState.notes = res.data.map(n => new Note(n))
    AppState.currentNotes = AppState.notes.filter(n => n.backlogItemId === backlogId)

    logger.log('this is the notes for this backlog', AppState.notes)
  }

  async removeNote(noteId, projectId) {
    const res = await api.delete(`api/projects/${projectId}/notes/` + noteId)
    logger.log('remove note', res)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
    AppState.currentNotes = AppState.notes.filter(n => n.id !== noteId)
  }

  async checkBox(checkId, projectId, checkData) {
    const res = await api.put(`api/projects/${projectId}/tasks/` + checkId, checkData)
    logger.log('chek box res', res)
  }
}

export const backlogsService = new BacklogsService()
