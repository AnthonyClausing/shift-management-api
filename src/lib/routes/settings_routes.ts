import { Application } from 'express'
import SettingsUsersController from '../controllers/settingsUsers'
import SettingsLocationsController from '../controllers/settingsLocations'

export class SettingsRoutes {
  public route(app: Application) {
    app.get('/:location_id/settings_users', SettingsUsersController.index)
    app.post('/:location_id/settings_users', SettingsUsersController.create)
    app.get('/:location_id/settings_locations', SettingsLocationsController.index)
    app.post('/:location_id/settings_locations', SettingsLocationsController.create)
  }
}
