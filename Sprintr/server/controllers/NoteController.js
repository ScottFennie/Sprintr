import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'
import BaseController from '../utils/BaseController'

export class NoteController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
      .get('', this.getNotes)
      .get('/:noteId', this.getNoteById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.deleteNote)
  }

  async getNoteById(req, res, next) {
    try {
      const note = await noteService.getNoteById(req.params.noteId)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      const notes = await noteService.getNotes(req.params.projectId)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const note = await noteService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const note = await noteService.deleteNote(req.params.noteId, req.userInfo.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
