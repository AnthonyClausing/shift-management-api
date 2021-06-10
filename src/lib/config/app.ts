import express, { Application } from 'express'
import { CommonRoutes } from '../routes/common_routes'
import { UserRoutes } from '../routes/user_routes'
import { UserShiftRoutes } from '../routes/shift_routes'
import { SettingsRoutes } from '../routes/settings_routes'

class App {
  public app: Application
  private common_routes: CommonRoutes = new CommonRoutes()
  private user_routes: UserRoutes = new UserRoutes()
  private shift_routes: UserShiftRoutes = new UserShiftRoutes()
  private settings_routes: SettingsRoutes = new SettingsRoutes()
  constructor() {
    this.app = express()
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
    this.user_routes.route(this.app)
    this.shift_routes.route(this.app)
    this.settings_routes.route(this.app)
    //common routes are last, catch all is located there
    this.common_routes.route(this.app)
  }
}
export default new App().app
