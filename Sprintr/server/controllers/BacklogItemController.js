import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'

export class BacklogItemController extends BaseController {
  constructor() {
    super('api/projects/:projectId/backlog')
    this.router
      .get('', this.getBacklog)
      .get('/:backlogId', this.getBacklogById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBacklog)
      .put('/:backlogId', this.editBacklog)
      .delete('/:backlogId', this.removeBacklog)
  }
}
