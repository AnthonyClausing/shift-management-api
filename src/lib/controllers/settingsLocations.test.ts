import User from '../../lib/models/user'
import Company from '../../lib/models/company'
import Location from '../../lib/models/location'
import request from 'supertest'
import app from '../../lib/config/app'
import { db } from '../../db'

const tables = ['user', 'company', 'location', 'location_user_shifts', 'user_companies', 'user_roles', 'user_locations']

async function promiseEach(tables: string[], fn: (t: string) => Promise<void>) {
  for (const table of tables) {
    await fn(table)
  }
}
async function truncate() {
  return await promiseEach(tables, (t) => db.raw(`TRUNCATE TABLE "${t}" cascade`))
}

describe('Integration Tests', function () {
  const initialParams = {
    user: {
      email: 'testOwner@test.com',
      password: 'testing123',
      first_name: 'TheNew',
      last_name: 'Guy',
    },
    company: {
      name: 'Test First',
    },
    location: {
      name: 'Test First 85th St',
      formatted_address: '2300 85 St New York, NY 10003',
      display_address: '85th St',
      country_code: '001',
      state: 'NY',
      county: 'New York',
    },
  }
  let location: { id: number }
  beforeAll(async () => {
    await truncate()
    const company = await Company.create(initialParams.company)
    location = await Location.create(initialParams.location, company.id)
    const firstUser = await User.create(initialParams.user, company.id)
    await User.createAssociations({ ...firstUser, role: 'owner' }, company.id, location.id)
  })

  describe('GET /:location_id/settings_locations', () => {
    it('returns status of 200', async () => {
      const result = await request(app).get(`/${location.id}/settings_locations`)
      expect(result.status).toBe(200)
    })
  })
  describe('POST /:location_id/settings_locations', () => {
    it('returns status of 201', async () => {
      const result = await request(app).post(`/${location.id}/settings_locations`)
      expect(result.status).toBe(201)
    })
  })
})
