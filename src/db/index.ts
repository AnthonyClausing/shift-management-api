import knexfile from '../../knexfile'
import knex, { Knex } from 'knex'

// Returns a timestamp suitable for inserting into Postgres
export const timestamp = (): string => new Date().toUTCString()

export class Connection {
  public knex(): Knex {
      return knex(exportConfig())
  }
}

function exportConfig() {
  const environment : string = process.env.NODE_ENV || 'development'
  return knexfile[environment]
}
