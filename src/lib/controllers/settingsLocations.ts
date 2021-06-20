import User from '../models/user'
import Company from '../models/company'
import Location from '../models/location'
import { Request, Response } from 'express'

const index = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findBy('auth_token', req.headers.token)
    const locations = await Company.locations(currentUser.company_id)
    res.status(200).json(locations)
  } catch (e) {
    res.json({ status: 400, error: e.message })
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findBy('auth_token', req.headers.token)
    const newLocation = await Location.create(req.body, currentUser.company_id)
    res.status(201).json(newLocation)
  } catch (e) {
    res.json({ status: 400, error: e.message })
  }
}

export default { index, create }
