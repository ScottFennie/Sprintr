export class Task {
  constructor(taskData) {
    this.id = taskData.id
    this.name = taskData.name
    this.weight = taskData.weight
    this.backlogId = taskData.backlogId
    this.creatorId = taskData.creatorId
    this.projectId = taskData.projectId
    this.isComplete = taskData.isComplete
    this.creator = taskData.creator = {}
    this.createdAt = taskData.createdAt
  }
}
