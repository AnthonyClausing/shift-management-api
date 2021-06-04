
import { Knex } from 'knex'

exports.seed = (knex: Knex) => seed(knex)

async function seed(knex: Knex) {
  return knex('company').truncate()
    .then(function () {
      return knex('company').insert([
        {name: 'Best Test Electronics'},
        {name: 'Target Testers'}
      ])
    })
}
