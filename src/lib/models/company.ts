import { db } from '../../db'

export interface CompanyParams {
  name: string
}

const create = async (company: CompanyParams) => {
  try {
    const companyQuery = await db.raw('INSERT INTO "company" (name) VALUES (?) RETURNING id', company.name)
    return companyQuery.rows[0]
  } catch (err) {
    throw new Error('Could not create company in Company model')
  }
}

const locations = async (companyId: number) => {
  try {
    const locationQuery = await db.raw(`SELECT * FROM "location" WHERE company_id=${companyId}`)
    return locationQuery.rows
  } catch (err) {
    throw new Error(`Something went wrong in Company model: ${err}`)
  }
}

const users = async (companyId: number) => {
  try {
    const locationQuery = await db.raw(`SELECT * FROM "user" WHERE "user".company_id=${companyId}`)
    return locationQuery.rows
  } catch (err) {
    throw new Error(`Something went wrong in Company model ${err}`)
  }
}

export default { create, locations, users }
