import express, { Application } from 'express'
import { TestRoutes } from '../routes/test_routes'
import { CommonRoutes } from '../routes/common_routes'
import { UserRoutes } from '../routes/user_routes'
import { UserShiftRoutes } from '../routes/shift_routes'

class App {
  public app: Application
  private test_routes: TestRoutes = new TestRoutes()
  private common_routes: CommonRoutes = new CommonRoutes()
  private user_routes: UserRoutes = new UserRoutes()
  private shift_routes: UserShiftRoutes = new UserShiftRoutes()

  constructor() {
    this.app = express()
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
    this.test_routes.route(this.app)
    this.user_routes.route(this.app)
    this.shift_routes.route(this.app)
    this.common_routes.route(this.app)
  }
}
export default new App().app
