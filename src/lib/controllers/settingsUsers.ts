// import LocationUserShift from '../models/locationUserShift'
import User from '../models/user'
import Location from '../models/location'
import Company from '../models/company'
import { Request, Response } from 'express'

const index = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findBy('auth_token', req.headers.token)
    const users = await Company.users(currentUser.company_id)
    const mappedUsers = users.map((u: any) => {
      const { id, email, first_name, last_name, phone } = u
      return { id, email, first_name, last_name, phone }
    })
    res.status(200).json(mappedUsers)
  } catch (e) {
    res.json({ status: 400, error: e.message })
  }
}
const locations = async (req: Request, res: Response) => {
  //get specific user's locations?
  try {
    // const currentUser = await User.findBy('auth_token', req.headers.token)
    // response.status(200).json(shifts)
  } catch (e) {
    res.json({ status: 400, error: e.message })
  }
}

const create = async (req: Request, res: Response) => {
  // email user's email
  const tempPassword: string = 'temp123'
  try {
    const currentUser = await User.findBy('auth_token', req.headers.token)
    const { role, email, first_name, last_name } = req.body.user
    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      throw new Error('A User with this email already exists')
    }
    const newUser = await User.create({ email, first_name, last_name, password: tempPassword }, currentUser.company_id)
    const { location_id } = req.params
    await User.createAssociations({ id: newUser.id, role }, +newUser.company_id, +location_id)
    res.status(201).json({ user: newUser })
  } catch (e) {
    res.json({ status: 400, error: e.message })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    //TODO turn this into a 'authorized check middleware?
    //TODO find way to update role too
    await User.findBy('auth_token', req.headers.token)
    const updatedUser = await User.update(Object.entries(req.body.user), req.body.user.id)
    res.status(200).json({ user: updatedUser })
  } catch (e) {
    res.json({ status: 400, error: e.message })
  }
}

export default { index, create, update }
