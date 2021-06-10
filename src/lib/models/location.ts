import { db } from '../../db'
import { CompanyParams } from './company'

export interface LocationParams {
  name: string
  formatted_address: string
  display_address: string
  country_code: string
  state: string
  county: string
}

const create = async (location: LocationParams, companyId: number) => {
  try {
    const locationQuery = await db.raw(
      'INSERT INTO location (company_id, name, formatted_address, display_address, country_code, state, county) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id',
      [
        companyId,
        location.name,
        location.formatted_address,
        location.display_address,
        location.country_code,
        location.state,
        location.county,
      ]
    )
    return locationQuery.rows[0]
  } catch (err) {
    throw new Error('Could not create location in Location Model')
  }
}

const findLocation = async () => {}

const users = async (locationId: number) => {
  try {
    const locationUsersQuery = await db.raw('SELECT * FROM "user_locations" WHERE location_id = ?', [locationId])
    return locationUsersQuery.rows[0]
  } catch (err) {
    throw new Error(`Could not find location, constraint error [${err.constraint}]: ${err.detail}`)
  }
}
export default { create, findLocation, users }
