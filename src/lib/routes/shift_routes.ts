import { Application, Request, Response } from 'express'
import LocationUserShiftController from '../controllers/locationUserShift'

export class UserShiftRoutes {
  public route(app: Application) {
    app.get('/:location_id/shifts', LocationUserShiftController.index)
    app.post('/:location_id/shifts', LocationUserShiftController.create)
    //app.put('/') //  update shifts
  }
}
