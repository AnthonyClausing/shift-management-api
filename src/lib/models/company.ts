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

export default { create }
