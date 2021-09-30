import { Auth0Provider } from '@bcwdev/auth0provider'
import { sprintService } from '../services/SprintService'
import BaseController from '../utils/BaseController'

export class SprintController extends BaseController {
  constructor() {
    super('api/projects/:projectId/sprints')
    this.router
      .get('', this.getSprints)
      .get('/:sprintId', this.getSprintById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSprint)
      .delete('/:sprintId', this.deleteSprint)
  }

  async getSprintById(req, res, next) {
    try {
      const sprint = await sprintService.getSprintById(req.params.sprintId)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async getSprints(req, res, next) {
    try {
      const sprints = await sprintService.getSprints(req.params.projectId)
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async createSprint(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const sprint = await sprintService.createSprint(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async deleteSprint(req, res, next) {
    try {
      const sprint = await sprintService.deleteSprint(req.params.sprintId, req.userInfo.id)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }
}
