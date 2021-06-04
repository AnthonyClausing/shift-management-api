import { Knex } from 'knex'

exports.seed = (knex: Knex) => seed(knex)

async function seed(knex: Knex) {
  return knex('location_user_shifts').truncate()
    .then(function () {
      return knex('location_user_shifts').insert([
        {user_id: 4, day: 14, month: 3, year: 2021, start_at: "09:00:00", end_at: "17:00:00", location_id: 1},
      ])
    })
}
