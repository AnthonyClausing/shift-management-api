import { db } from '../../db'
import Auth from './auth'

//trying to query with user was not working, adding double qoutes seems to fix it
//https://stackoverflow.com/a/67628318
export interface UserParams {
  password: string
  email: string
  first_name: string
  last_name: string
}
export interface UserData {
  id: number
  company_id: number
  email: string
  auth_token: string
  password_digest?: string
}

const create = async (params: UserParams, companyId: number): Promise<UserData> => {
  try {
    const hashedPassword = await Auth.hashPassword(params.password)
    const user = { ...params, password_digest: hashedPassword }
    const userQuery = await db.raw(
      'INSERT INTO "user" (company_id, email, password_digest, first_name, last_name) VALUES (?, ?, ?, ?, ?) RETURNING id, email, auth_token, company_id',
      [companyId, user.email, user.password_digest, user.first_name, user.last_name]
    )
    return userQuery.rows[0]
  } catch (err) {
    throw new Error('Could not create user in User Model')
  }
}
const update = async (params: Array<Array<String>>, userId: number) => {
  const setString = params.reduce((acc, curr, idx) => {
    return curr[0] === 'id' ? acc : `${acc}${curr[0]} = '${curr[1]}', `
  }, '')
  try {
    const userQuery = await db.raw(
      `UPDATE "user" SET ${setString.slice(
        0,
        setString.length - 2
      )} WHERE id = ${userId} RETURNING id, email, first_name, last_name`
    )
    return userQuery.rows[0]
  } catch (err) {
    throw new Error('Could not update user in User Model')
  }
}

const createAssociations = async (
  user: { id: number; role: string },
  companyId: number,
  locationId: number
): Promise<void> => {
  try {
    //look up way to combine into one query?
    //Better performance? 1 person shouldnt require 6 separate db calls
    await db.raw('INSERT INTO user_companies (user_id, company_id) VALUES (?, ?)', [user.id, companyId])
    await db.raw('INSERT INTO user_locations (user_id, location_id) VALUES (?, ?)', [user.id, locationId])
    //possibly add multiple roles capability?
    await db.raw('INSERT INTO user_roles (user_id, role) VALUES (?, ?)', [user.id, user.role])
  } catch (err) {
    throw new Error(`Could not create association for user with id of ${user.id}`)
  }
}

//if datbase isnt connected will database.raw still return undefined?
const findBy = async (identifier: any, value: any): Promise<UserData> => {
  const userQuery = await db.raw(`SELECT * FROM "user" WHERE ${identifier} = ?`, [value])
  return userQuery.rows[0]
}

//Instance methods
const locations = async (userId: number) => {
  //I feel like this should all be a class, no reason why I shouldnt have a 'this' for userId
  const userQuery = await db.raw(
    `SELECT * FROM "user_locations" JOIN "location" ON "user_locations".location_id="location".id WHERE user_id = ${userId}`
  )
  return userQuery.rows
}

const updateToken = async (token: any, id: number) => {
  const updatedUser = await db.raw('UPDATE "user" SET auth_token = ? WHERE id = ? RETURNING id, email, auth_token', [
    token,
    id,
  ])
  return updatedUser.rows[0]
}

export default { findBy, locations, create, update, createAssociations, updateToken }
