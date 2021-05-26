import { Application, Request, Response } from 'express';
import UserController from '../controllers/user.js'

export class UserRoutes {
    public route(app: Application) {
      app.post('/users/signup', UserController.signup)

      app.post('/users/signin', UserController.signin)

      app.get("/users/me", async (req, res) => {
        res.sendStatus(200)
      });
    }
}