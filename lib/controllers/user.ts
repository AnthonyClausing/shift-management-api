import Location  from '../models/location'
import Company from '../models/company'
import User from '../models/user'
import Auth from '../models/auth'
import { request, response } from 'express';

//TODO
//FRONTEND: authenticate before any route, and if the route is signup, redirect to home
//leverage Express middleware to handle authorization on protected routes
//Separate signup for users who are signing up from an email sent by owner/manager/admin(?)
const signup = async(request, response) => {
  try {
    const params = request.body
    const existingUser = await User.findBy('email', params.user.email)
    console.log(existingUser,'in controller')
    if(existingUser) {
      throw new Error('A User with this email already exists')
    }
    if(params.user.password.length > 5) {
      throw new Error('Passwords must be greater than 5 characters')
    }
    const newCompany = await Company.create(params.company)
    const newLocation = await Location.create(params.location, newCompany)
    const newUser = await User.create(params.user, newCompany)
    await User.createAssociations({...newUser, role: 'owner'}, newCompany, newLocation)
    response.status(201).json({ user: newUser })
  } catch(e) {
    response.json({"status": 400, "error": e.message})
  }
}

const signin = async(request, response) => {
  try {
    const params = request.body
    let user = await User.findBy('email', params.user.email)
    await Auth.checkPassword(params.user.password, user)
    let token = await Auth.createToken()
    await User.updateToken(token, user)
    delete user.password_digest
    response.status(200).json(user)
  } catch(e) { 
    response.json({"status": 400, "error": e.message})
  }
}

const signout = async(request, response) => {
  try {
    const params = request.body
    const user = await User.findBy('email', params.user.email)
    await User.updateToken(null, user)
    response.status(200)
  } catch(e) {
    response.json({"status": 400, "error": e.message})
  }
}

export default {signup, signin, signout}