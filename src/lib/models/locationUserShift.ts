import { Connection } from '../../db'

export interface ShiftParams { 
    user_id: string
    day: string
    month: string
    year: string
    start_at: string
    end_at: string
    location_id: string
}

const db = new Connection().knex()

const create = async(shiftInfo: ShiftParams) => {
  try {
    const shiftQuery = await db.raw(
      'INSERT INTO location_user_shifts (user_id, day, month, year, start_at, end_at, location_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *',
      [shiftInfo.user_id, shiftInfo.day, shiftInfo.month, shiftInfo.year, shiftInfo.start_at, shiftInfo.end_at, shiftInfo.location_id]
    )
    return shiftQuery.rows[0]
  } catch(err) {
    console.log(err)
    throw new Error(`Could not create shift, constraint error [${err.constraint}]: ${err.detail}`)
  }
}

const findAll = async(locationId: string) => {
    const shiftQuery = await db.raw(`SELECT * FROM "location_user_shifts" WHERE location_id = ?`, [locationId])
    return shiftQuery.rows
}

export default { create, findAll }
