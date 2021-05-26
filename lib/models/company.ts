const environment     = process.env.NODE_ENV || 'development';    // set environment
const configuration   = require('../../../knexfile')[environment];   // pull in correct db with env configs
const database        = require('knex')(configuration);           // define database based on above

const create = async(company) => {
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

export default { create }
