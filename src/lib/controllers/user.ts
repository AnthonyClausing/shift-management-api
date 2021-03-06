import Location from '../models/location'
import Company from '../models/company'
import User from '../models/user'
import Auth from '../models/auth'
import { Request, Response } from 'express'

//TODO
//FRONTEND: authenticate before any route, and if the route is signup, redirect to home
//leverage Express middleware to handle authorization on protected routes
//Separate signup for users who are signing up from an email sent by owner/manager/admin(?)
const signup = async (req: Request, res: Response) => {
  try {
    const params = req.body
    const existingUser = await User.findBy('email', params.user.email)
    if (existingUser) {
      throw new Error('A User with this email already exists')
    }
    if (params.user.password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
    //TODO: turn into transaction? For way to revert creations
    const newCompany = await Company.create(params.company)
    const newLocation = await Location.create(params.location, newCompany.id)
    const newUser = await User.create(params.user, newCompany.id)
    await User.createAssociations({ id: newUser.id, role: 'owner' }, newCompany.id, newLocation.id)
    const token = await Auth.createToken()
    await User.updateToken(token, newUser.id)
    res.status(201).json({ user: newUser })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

const signin = async (req: Request, res: Response) => {
  try {
    const params = req.body
    const user = await User.findBy('email', params.user.email)
    if (user) {
      await Auth.checkPassword(params.user.password, user.password_digest || '')
      const token = await Auth.createToken()
      //add token to json data
      await User.updateToken(token, user.id)
      delete user.password_digest
      res.status(200).json(user)
    } else {
      throw new Error('User with given email not found')
    }
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

const signout = async (req: Request, res: Response) => {
  try {
    const params = req.body
    const user = await User.findBy('email', params.user.email)
    await User.updateToken(null, user.id)
    res.status(200)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}

export default { signup, signin, signout }
