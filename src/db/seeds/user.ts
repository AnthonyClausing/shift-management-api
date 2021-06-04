import bcrypt from 'bcrypt'
import { Knex } from 'knex'

const hashPassword = async (password: string) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err: Error | undefined, hash: string) => {
      err ? reject(err) : resolve(hash)
    })
  )
}

exports.seed = (knex: Knex) => seed(knex)

async function seed(knex: Knex) {
  await knex('user').truncate()
  return await knex('user').insert([
    {
      company_id: 1,
      email: 'owner@besttest.com',
      password_digest: await hashPassword('test123'),
      first_name: 'OwnerOf',
      last_name: 'BestTest',
      phone: '347-555-1234',
    }, //pw:"test123"
    {
      company_id: 2,
      email: 'owner@targettesters.com',
      password_digest: await hashPassword('testtest'),
      first_name: 'OwnerOf',
      last_name: 'TargetTesters',
      phone: '347-555-2345',
    }, //pw:"testtest"
    {
      company_id: 1,
      email: 'manager@besttest.com',
      password_digest: await hashPassword('manager123'),
      first_name: 'ManagerOf',
      last_name: 'BestTest',
      phone: '347-555-3456',
    }, //pw:"manager123"
    {
      company_id: 1,
      email: 'employee@besttest.com',
      password_digest: await hashPassword('employee123'),
      first_name: 'EmployeeOf',
      last_name: 'BestTest',
      phone: '347-555-4567',
    }, //pw:employee123
  ])
}
