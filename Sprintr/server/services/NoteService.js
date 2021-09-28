import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NoteService {
  async getNoteById(noteId) {
    const note = await dbContext.Notes.findById(noteId)
    if (!note) {
      throw new BadRequest('invalid note Id')
    }
    return note
  }

  async getNotes(projectId) {
    const notes = await dbContext.Notes.find({ projectId })
    return notes
  }

  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    return note
  }

  async deleteNote(noteId, userId) {
    const note = await this.getNoteById(noteId)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden('You cant do that! Stahp!')
    }
    await note.remove()
    return note
  }
}
export const noteService = new NoteService()
