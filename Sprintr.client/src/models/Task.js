export class Task {
  constructor(taskData) {
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
