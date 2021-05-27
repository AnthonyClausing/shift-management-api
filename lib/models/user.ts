const environment     = process.env.NODE_ENV || 'development';    // set environment
const configuration   = require('../../../knexfile')[environment];   // pull in correct db with env configs
const database        = require('knex')(configuration);           // define database based on above
import Auth from './auth'
//trying to query with user was not working, adding double qoutes seems to fix it
//https://stackoverflow.com/a/67628318
const create = async(user, company) => {
  try {
    const hashedPassword = await Auth.hashPassword(user.password)
    const token = await Auth.createToken()
    delete user.password
    user.password_digest = hashedPassword
    user.token = token
    const userQuery = await database.raw(
      'INSERT INTO "user" (company_id, email, password_digest, auth_token, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?) RETURNING id, email, auth_token',
      [company.id, user.email, user.password_digest, user.token, user.first_name, user.last_name]
    )
    return userQuery.rows[0]
  }catch(err) {
    throw new Error(`Could not create user, constraint error [${err.constraint}]: ${err.detail}`)
  }

}

const createAssociations = async(user, company, location) => {
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

//if datbase isnt connected will database.raw still return undefined?
const findBy = async (identifier, value) => {
  const userQuery = await database.raw(`SELECT * FROM "user" WHERE ${identifier} = ?`, [value])
  if(!userQuery.rows[0]) throw new Error(`Could not find User where ${identifier} = ${value}`)
  return userQuery.rows[0]
}

const updateToken = async (token, user) => {
  const updatedUser = await database.raw('UPDATE "user" SET auth_token = ? WHERE id = ? RETURNING id, email, auth_token', [token, user.id])
  return updatedUser.rows[0]
}

export default { findBy, create, createAssociations, updateToken }