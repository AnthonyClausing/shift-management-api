import { Application, Request, Response } from 'express';
import SettingsUsersController from '../controllers/settings_users'
import SettingsLocationsController from '../controllers/settings_locations'

export class SettingsRoutes {
    public route(app: Application) {
      app.get('/:location_id/setting_users',  SettingsUsersController.index)
      app.get('/:location_id/settings_locations', SettingsLocationsController.create)
      //app.put('/') //  update shifts
    }
}