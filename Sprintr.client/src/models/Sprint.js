export class Sprint {
  constructor(sprintData) {
    this.name = sprintData.name
    this.startDate = sprintData.startDate
    this.endDate = sprintData.endDate
    this.projectId = sprintData.projectId
    this.creatorId = sprintData.creatorId
    this.creator = sprintData.creator = {}
    this.createdAt = sprintData.createdAt
  }
}
