import { Connection } from '../../db'
import Auth from './auth'
import {CompanyParams} from './company'
const db = new Connection().knex()

//trying to query with user was not working, adding double qoutes seems to fix it
//https://stackoverflow.com/a/67628318
export interface UserParams { 
  password: string
  password_digest: string
  token: string
  email: string
  first_name: string
  last_name: string
}

const create = async(user: UserParams, company: CompanyParams) => {
  try {
    const hashedPassword = await Auth.hashPassword(user.password)
    const token = await Auth.createToken()
    user.password_digest = hashedPassword
    user.token = token
    const userQuery = await db.raw(
      'INSERT INTO "user" (company_id, email, password_digest, auth_token, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?) RETURNING id, email, auth_token',
      [company.id, user.email, user.password_digest, user.token, user.first_name, user.last_name]
    )
    return userQuery.rows[0]
  }catch(err) {
    throw new Error(`Could not create user, constraint error [${err.constraint}]: ${err.detail}`)
  }

}

const createAssociations = async(user: { id: any; role: any; }, companyId: string, locationId: string) => {
  try {
    //look up way to combine into one query?
    //Better performance? 1 person shouldnt require 6 separate db calls
    await db.raw(
      'INSERT INTO user_companies (user_id, company_id) VALUES (?, ?)',
      [user.id, companyId]
    )
    await db.raw(
      'INSERT INTO user_locations (user_id, location_id) VALUES (?, ?)',
      [user.id, locationId]
    )
    //possibly add multiple roles capability? 
    await db.raw(
      'INSERT INTO user_roles (user_id, role) VALUES (?, ?)',
      [user.id, user.role]
    )
  } catch(err) {
    console.error(err)
  }
}

//if datbase isnt connected will database.raw still return undefined?
const findBy = async (identifier: any, value: any) => {
  const userQuery = await db.raw(`SELECT * FROM "user" WHERE ${identifier} = ?`, [value])
  if(!userQuery.rows[0]) throw new Error(`Could not find User where ${identifier} = ${value}`)
  return userQuery.rows[0]
}

const updateToken = async (token: any, user: { id: any; }) => {
  const updatedUser = await db.raw('UPDATE "user" SET auth_token = ? WHERE id = ? RETURNING id, email, auth_token', [token, user.id])
  return updatedUser.rows[0]
}

export default { findBy, create, createAssociations, updateToken }