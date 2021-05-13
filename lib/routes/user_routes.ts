import { Application, Request, Response } from 'express';

export class UserRoutes {
    public route(app: Application) {
      
      app.post('/users/login', async(req, res) => {
        try{
          let {email, password} = req.body
          res.sendStatus(200)
        }catch(e) {
          console.log("!!!!ERROR!!!!",e)
          res.sendStatus(500)
        }
      })

      app.get("/users/me", async (req, res) => {
        res.sendStatus(200)
      });

    }
}