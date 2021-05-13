
// const configOptions = knexfile[env];
// console.log( configOptions ,'hello')
// export default knex(configOptions)
import Knex from 'knex';
import knexfile from '../knexfile';
const env = process.env.NODE_ENV || 'development';

const instance = Knex(knexfile[env])

instance
  .raw('select 1')
  .then(() => {
    console.info(`Connected to database - OK`)
  })
  .catch(err => {
    console.error(`Failed to connect to database: ${err}`)
    process.exit(1)
  })

export const db = () => instance

// Returns a timestamp suitable for inserting into Postgres
export const timestamp = (): string => new Date().toUTCString()