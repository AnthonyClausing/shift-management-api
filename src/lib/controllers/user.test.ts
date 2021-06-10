import User from '../../lib/models/user'
import Company from '../../lib/models/company'
import Location from '../../lib/models/location'
import request from 'supertest'
import app from '../../lib/config/app'
import { db } from '../../db'

const tables = ['user', 'company', 'location', 'location_user_shifts', 'user_companies', 'user_roles', 'user_locations']

async function promiseEach(tables: string[], fn: (t: string) => Promise<void>) {
  // take an array and a function
  for (const table of tables) {
    await fn(table)
  }
}
async function truncate() {
  return await promiseEach(tables, (t) => db.raw(`TRUNCATE TABLE "${t}" cascade`))
}

// function seed () {
//   return promiseEach(tables, (t) => db(t).insert(require('../seeds/' + t)))
// };

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

  beforeAll(async () => {
    await truncate()
    const company = await Company.create(initialParams.company)
    const location = await Location.create(initialParams.location, company.id)
    const firstUser = await User.create(initialParams.user, company.id)
    await User.createAssociations({ ...firstUser, role: 'owner' }, company.id, location.id)
  })

  describe('POST /users/signup', () => {
    const newUserParams = {
      user: {
        email: 'testUser@test.com',
        password: 'testing123',
        first_name: 'TheSecond',
        last_name: 'Guy',
      },
      company: {
        name: 'Test Second',
      },
      location: {
        name: 'Test Second 86th St',
        formatted_address: '2400 86 St New York, NY 10003',
        display_address: '86th St',
        country_code: '001',
        state: 'NY',
        county: 'New York',
      },
    }
    describe('returns an error when', () => {
      it('a user with an existing email is found', async () => {
        const result = await request(app)
          .post('/users/signup')
          .send({ ...newUserParams, user: { ...newUserParams.user, email: initialParams.user.email } })
        expect(result.status).toBe(400)
        expect(result.body.error).toBe('A User with this email already exists')
      })
      it('the length of given password is not greater than 5', async () => {
        const result = await request(app)
          .post('/users/signup')
          .send({ ...newUserParams, user: { ...newUserParams.user, password: 'short' } })
        expect(result.status).toBe(400)
        expect(result.body.error).toBe('Password must be at least 6 characters')
      })
      it('a Company could not be created', async () => {
        const result = await request(app)
          .post('/users/signup')
          .send({ ...newUserParams, company: {} })
        expect(result.status).toBe(400)
        expect(result.body.error).toBe('Could not create company in Company model')
      })
      it('a Location could not be created', async () => {
        const result = await request(app)
          .post('/users/signup')
          .send({ ...newUserParams, location: {} })
        expect(result.status).toBe(400)
        expect(result.body.error).toBe('Could not create location in Location Model')
        // expect(result.body.error).toBe('A user with this email already exists')
      })
      it('a User could not be created', async () => {
        const result = await request(app)
          .post('/users/signup')
          .send({ ...newUserParams, user: { ...newUserParams.user, first_name: null, last_name: null } })
        expect(result.status).toBe(400)
        expect(result.body.error).toBe('Could not create user in User Model')
        // expect(result.body.error).toBe('A user with this email already exists')
      })
    })
    it('successfully creates a user', async () => {
      const result = await request(app).post('/users/signup').send(newUserParams)
      expect(result.status).toBe(201)
      expect(result.body.user.email).toBe(newUserParams.user.email)
    })
  })
  describe('POST /users/signin', () => {
    describe('returns an error when', () => {
      it('a user with the given email does not exist', async () => {
        const result = await request(app)
          .post('/users/signin')
          .send({ user: { email: 'bad@email.com', password: initialParams.user.password } })
        expect(result.status).toBe(400)
        expect(result.body.error).toBe('User with given email not found')
      })
      it('a given password does not match', async () => {
        const result = await request(app)
          .post('/users/signin')
          .send({ user: { email: initialParams.user.email, password: 'badPassword' } })
        expect(result.status).toBe(400)
        expect(result.body.error).toBe('Passwords do not match')
      })
    })
    it('successfully returns user info', async () => {
      const result = await request(app)
        .post('/users/signin')
        .send({ user: { email: initialParams.user.email, password: initialParams.user.password } })
      expect(result.body.email).toBe(initialParams.user.email)
      expect(result.body.auth_token).toBeDefined()
    })
  })
  describe('GET /users/me', () => {
    it('returns user info', async () => {
      const result = await request(app).get('/users/me')
      expect(result.status).toBe(200)
    })
  })
})
