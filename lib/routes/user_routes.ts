import { Application, Request, Response } from 'express';
import User from './models/user.js'

export class UserRoutes {
    public route(app: Application) {
      app.post('/users/signup', User.signup)

      app.post('/users/signin', User.signin)

      app.get("/users/me", async (req, res) => {
        res.sendStatus(200)
      });
    }
}