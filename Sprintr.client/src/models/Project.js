export class Project {
  constructor(proData) {
    this.id = proData.id
    this.name = proData.name
    this.description = proData.description
    this.creatorId = proData.creatorId
    this.creator = proData.creator = {}
    this.createdAt = proData.createdAt
  }
}
