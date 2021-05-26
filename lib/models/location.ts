const environment     = process.env.NODE_ENV || 'development';    // set environment
const configuration   = require('../../../knexfile')[environment];   // pull in correct db with env configs
const database        = require('knex')(configuration);           // define database based on above

const create = async(location, company) => {
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

const findLocation = async() => {}

export default { create, findLocation }