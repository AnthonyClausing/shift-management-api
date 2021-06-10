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
  email: string
  auth_token: string
}

const create = async (params: UserParams, companyId: number): Promise<UserData> => {
  try {
    const hashedPassword = await Auth.hashPassword(params.password)
    const token = await Auth.createToken()
    const user = { ...params, password_digest: hashedPassword, token }
    const userQuery = await db.raw(
      'INSERT INTO "user" (company_id, email, password_digest, auth_token, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?) RETURNING id, email, auth_token',
      [companyId, user.email, user.password_digest, user.token, user.first_name, user.last_name]
    )
    return userQuery.rows[0]
  } catch (err) {
    throw new Error('Could not create user in User Model')
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
const findBy = async (identifier: any, value: any) => {
  const userQuery = await db.raw(`SELECT * FROM "user" WHERE ${identifier} = ?`, [value])
  return userQuery.rows[0]
}

const updateToken = async (token: any, id: number) => {
  const updatedUser = await db.raw('UPDATE "user" SET auth_token = ? WHERE id = ? RETURNING id, email, auth_token', [
    token,
    id,
  ])
  return updatedUser.rows[0]
}

export default { findBy, create, createAssociations, updateToken }
