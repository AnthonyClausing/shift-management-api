import { Knex } from 'knex'

exports.seed = (knex: Knex) => seed(knex)

async function seed(knex: Knex) {
  return knex('user_roles')
    .truncate()
    .then(function () {
      return knex('user_roles').insert([
        { user_id: 1, role: 'owner' },
        { user_id: 2, role: 'owner' },
        { user_id: 3, role: 'manager' },
        { user_id: 4, role: 'employee' },
      ])
    })
}
