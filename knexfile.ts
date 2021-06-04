import * as path from 'path'
import dotenv from 'dotenv'

dotenv.config()

interface Config {
  client: string,
  connection: string,
  migrations: {
    directory: string
  },
  seeds: {
    directory: string
  },
  useNullAsDefault: boolean
}

const database : { [key: string]: Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || '',
    migrations: {
      directory: path.resolve('./src/db/migrations'),
    },
    seeds: { directory: path.resolve('./src/db/seeds') },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL || '',
    migrations: {
      directory: path.resolve('./src/db/migrations'),
    },
    seeds: { directory: path.resolve('./src/db/seeds') },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || '',
    migrations: {
      directory: path.resolve('./src/db/migrations'),
    },
    seeds: { directory: path.resolve('./src/db/seeds') },
    useNullAsDefault: true
  },
}

export = database
