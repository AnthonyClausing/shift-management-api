import { Application, Request, Response } from 'express'
import UserController from '../controllers/user'

export class UserRoutes {
  public route(app: Application) {
    app.post('/users/signup', UserController.signup)

    app.post('/users/signin', UserController.signin)

    app.get('/users/me', async (req: Request, res: Response) => {
      res.sendStatus(200)
    })
  }
}
