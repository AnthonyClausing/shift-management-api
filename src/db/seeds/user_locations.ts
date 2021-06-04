import { Knex } from 'knex'

exports.seed = (knex: Knex) => seed(knex)

async function seed(knex: Knex) {
  return knex('user_locations')
    .truncate()
    .then(function () {
      return knex('user_locations').insert([
        { user_id: 1, location_id: 1 },
        { user_id: 2, location_id: 2 },
        { user_id: 3, location_id: 1 },
        { user_id: 4, location_id: 1 },
      ])
    })
}
