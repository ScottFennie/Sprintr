export class Note {
  constructor(noteData) {
    this.body = noteData.body
    this.backlogId = noteData.backlogId
    this.projectId = noteData.projectId
    this.creatorId = noteData.creatorId
    this.creator = noteData.creator = {}
    this.createdAt = noteData.createdAt
  }
}
