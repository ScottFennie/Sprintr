export class Backlog {
  constructor(backlogData) {
    this.name = backlogData.name
    this.description = backlogData.description
    this.status = backlogData.status
    this.sprintId = backlogData.sprintId
    this.projectId = backlogData.projectId
    this.creatorId = backlogData.creatorId
    this.creator = backlogData.creator = {}
    this.createdAt = backlogData.createdAt
  }
}
