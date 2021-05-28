const environment     = process.env.NODE_ENV || 'development';    // set environment
const configuration   = require('../../../knexfile')[environment];   // pull in correct db with env configs
const database        = require('knex')(configuration);           // define database based on above

const create = async(shiftInfo) => {
  // console.log(shiftInfo,'create')
  try {
    const shiftQuery = await database.raw(
      'INSERT INTO location_user_shifts (user_id, day, month, year, start_at, end_at, location_id) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *',
      [shiftInfo.user_id, shiftInfo.day, shiftInfo.month, shiftInfo.year, shiftInfo.start_at, shiftInfo.end_at, shiftInfo.location_id]
    )
    return shiftQuery.rows[0]
  } catch(err) {
    console.log(err)
    throw new Error(`Could not create shift, constraint error [${err.constraint}]: ${err.detail}`)
  }
}

const findAll = async(locationId) => {
    const shiftQuery = await database.raw(`SELECT * FROM "location_user_shifts" WHERE location_id = ?`, [locationId])
    return shiftQuery.rows
}

export default { create, findAll }
