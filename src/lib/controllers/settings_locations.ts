import User from '../models/user'
import Location from '../models/location'
import { Request, Response } from 'express'

const index = async (req: Request, res: Response) => {
  try {
    const locations = await Location.findLocation()
    res.status(200).json(locations)
  } catch (e) {
    res.json({ status: 400, error: e.message })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const newLocation = await Location.create({ ...req.body, ...req.params }, { id: 5 })
    res.status(201).json({ location: newLocation })
  } catch (e) {
    res.json({ status: 400, error: e.message })
  }
}

export default { index, create }
