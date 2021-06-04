import { Connection } from '../../db'

export interface CompanyParams {
  id: string | number
  name: string
}

const create = async (company: CompanyParams) => {
  const db = new Connection().knex()
  try {
    const companyQuery = await db.raw('INSERT INTO "company" (name) VALUES (?) RETURNING id', company.name)
    return companyQuery.rows[0]
  } catch (err) {
    throw new Error(`Could not create company, constraint error [${err.constraint}]: ${err.detail}`)
  }
}

export default { create }
