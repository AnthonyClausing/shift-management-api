const environment     = process.env.NODE_ENV || 'development';    // set environment
const configuration   = require('../../../knexfile')[environment];   // pull in correct db with env configs
const database        = require('knex')(configuration);           // define database based on above
const bcrypt          = require('bcrypt')                         // bcrypt will encrypt passwords to be saved in db   
import * as crypto from 'crypto'
import { response } from 'express';

//Separate signup for users who are signing up from an email sent by owner/manager/admin(?)


//trying to query with user was not working, adding double qoutes seems to fix it
//https://stackoverflow.com/a/67628318
const signup = async(request, response) => {
  try {
    const params = request.body
    const newCompany = await createCompany(params.company)
    const newLocation = await createLocation(params.location, newCompany)
    const hashedPassword = await hashPassword(params.user.password)
    const token = await createToken()
    delete params.user.password
    params.user.password_digest = hashedPassword
    params.user.token = token
    const newUser = await createUser(params.user, newCompany)
    await createUserAssociations({...newUser, role: 'owner'}, newCompany, newLocation)
    response.status(201).json({ user: newUser })
  } catch(err) {
    console.error(err)
  }
}

const signin = async(request, response) => {
  try {
    const params = request.body
    let user = await findUser(params.user)
    await checkPassword(params.user.password, user)
    let token = await createToken()
    await updateUserToken(token, user)
    delete user.password_digest
    response.status(200).json(user)
  } catch(err) { 
    console.error(err)
  }
}

const hashPassword = async(password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash)
    })
  )
}

const checkPassword = async(reqPassword, foundUser) => {
  return new Promise((resolve, reject) => 
    bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
        if (err) {
          reject(err)
        }
        else if (response) {
          resolve(response)
        } else {
          reject(new Error('Passwords do not match.'))
        }
    }))
}

const createUser = async(user, company) => {
  const userQuery = await database.raw(
    'INSERT INTO "user" (company_id, email, password_digest, auth_token, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?) RETURNING id, email, auth_token',
    [company.id, user.email, user.password_digest, user.token, user.first_name, user.last_name]
  )
  return userQuery.rows[0]
}

const findUser = async (user) => {
  const userQuery = await database.raw('SELECT * FROM "user" WHERE email = ?', [user.email])
  return userQuery.rows[0]
}

const createCompany = async(company) => {
  try {
    const companyQuery = await database.raw(
      'INSERT INTO company (name) VALUES (?) RETURNING id',
      [company.name]
    )
    return companyQuery.rows[0]
  } catch(err) {
    console.log(`constraint error [${err.constraint}]: ${err.detail}`)
  }
}

const createLocation = async(location, company) => {
  try {
    const locationQuery = await database.raw(
      'INSERT INTO location (company_id, name, formatted_address, display_address, country_code, state, county) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id',
      [company.id, location.name, location.formatted_address, location.display_address,  location.country_code,  location.state,  location.county]
    )
    return locationQuery.rows[0]
  } catch(err) {
    console.log(err)
  }
}

const createUserAssociations = async(user, company, location) => {
  try {
    //look up way to combine into one query?
    //Better performance? 1 person shouldnt require 6 separate db calls
    await database.raw(
      'INSERT INTO user_companies (user_id, company_id) VALUES (?, ?)',
      [user.id, company.id]
    )
    await database.raw(
      'INSERT INTO user_locations (user_id, location_id) VALUES (?, ?)',
      [user.id, location.id]
    )
    //possibly add multiple roles capability? 
    await database.raw(
      'INSERT INTO user_roles (user_id, role) VALUES (?, ?)',
      [user.id, user.role]
    )
  } catch(err) {
    console.error(err)
  }
}

const createToken = async() => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString('base64'))
    })
  })
}

const updateUserToken = async (token, user) => {
  const updatedUser = await database.raw('UPDATE "user" SET auth_token = ? WHERE id = ? RETURNING id, email, auth_token', [token, user.id])
  return updatedUser.rows[0]
}

export default { signup, signin }