import { Knex } from 'knex'

exports.seed = (knex: Knex) => seed(knex)

async function seed(knex: Knex) {
  return knex('user_companies')
    .truncate()
    .then(function () {
      return knex('user_companies').insert([
        { user_id: 1, company_id: 1 },
        { user_id: 2, company_id: 2 },
        { user_id: 3, company_id: 1 },
        { user_id: 4, company_id: 1 },
      ])
    })
}
