import { Auth0Provider } from '@bcwdev/auth0provider'
import { backlogItemService } from '../services/BacklogItemService'
import BaseController from '../utils/BaseController'

export class BacklogItemController extends BaseController {
  constructor() {
    super('api/projects/:projectId/backlog')
    this.router
      .get('', this.getBacklogItems)
      .get('/:backlogId', this.getBacklogItemById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBacklogItem)
      .put('/:backlogId', this.editBacklogItem)
      .delete('/:backlogId', this.removeBacklogItem)
  }

  async getBacklogItemById(req, res, next) {
    try {
      const backlog = await backlogItemService.getBacklogItemById(req.params.BacklogId)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async getBacklogItems(req, res, next) {
    try {
      const backlogs = await backlogItemService.getBacklogItems(req.params.projectId)
      res.send(backlogs)
    } catch (error) {
      next(error)
    }
  }

  async createBacklogItem(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const backlog = await backlogItemService.createBacklogItem(req.body)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async editBacklogItem(req, res, next) {
    try {
      const backlog = await backlogItemService.editBacklogItem(req.params.backlogId, req.userInfo.id, req.body)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async removeBacklogItem(req, res, next) {
    try {
      const backlog = await backlogItemService.removeBacklogItem(req.params.BacklogId)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }
}
